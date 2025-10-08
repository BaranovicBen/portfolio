//
//  Untitled.swift
//  Demo BranBen
//
//  Created by Benjamín Baranovič on 26/08/2025.
//

//
//  ContentView.swift
//  Demo BranBen
//
//  Created by Benjamín Baranovič on 25/08/2025.
//

import SwiftUI
import SceneKit

struct CoinSceneView: View {
    @StateObject private var ctrl = CoinSceneController()
    @State private var lastResult: String = "—"
    @State private var headsCount = 0
    @State private var tailsCount = 0

    var body: some View {
        ZStack {
            // Scene
            SceneView(scene: ctrl.scene,
                      pointOfView: ctrl.cameraNode,
                      options: [], // was [.allowsCameraControl]; disable to avoid camera being rotated
                      preferredFramesPerSecond: 60)
                .ignoresSafeArea()

            // UI overlay
            VStack {
                // Scoreboard at top
                HStack(spacing: 16) {
                    Text("Heads: \(headsCount)")
                    Text("Tails: \(tailsCount)")
                }
                .font(.title3.monospacedDigit().weight(.semibold))
                .padding(.vertical, 8)
                .padding(.horizontal, 14)
                .background(.ultraThinMaterial, in: Capsule())
                .padding(.top, 16)

                Spacer()

                // Result label
                Text("Result: \(lastResult)")
                    .font(.title3.weight(.semibold))
                    .padding(.bottom, 8)

                // Big Flip + Reset
                HStack(spacing: 12) {
                    Button {
                        let r = ctrl.flip()
                        lastResult = (r == .heads) ? "Heads" : "Tails"
                        if r == .heads { headsCount += 1 } else { tailsCount += 1 }
                    } label: {
                        Text(ctrl.isFlipping ? "Flipping…" : "Flip")
                            .font(.title2.bold())
                            .frame(maxWidth: .infinity, minHeight: 60)
                            .background(.blue.opacity(0.20), in: RoundedRectangle(cornerRadius: 16))
                    }
                    .disabled(ctrl.isFlipping)                 // <— ZÁMOK
                    .opacity(ctrl.isFlipping ? 0.6 : 1.0)      // vizuálna spätná väzba

                    Button {
                        ctrl.reset()                           // <— vráti mincu “domov”
                        lastResult = "—"
                        headsCount = 0
                        tailsCount = 0
                    } label: {
                        Text("Reset")
                            .font(.title3.bold())
                            .frame(minWidth: 110, minHeight: 60)
                            .background(.gray.opacity(0.15), in: RoundedRectangle(cornerRadius: 16))
                    }
                }
                .padding(.horizontal)
                .padding(.bottom, 24)

                // Optional: test buttons to force a side (keep if you like)
                HStack(spacing: 10) {
                    Button("Force Heads") {
                        _ = ctrl.flip(to: .heads)
                        lastResult = "Heads"
                        headsCount += 1
                    }
                    .buttonStyle(.bordered)

                    Button("Force Tails") {
                        _ = ctrl.flip(to: .tails)
                        lastResult = "Tails"
                        tailsCount += 1
                    }
                    .buttonStyle(.bordered)
                }
                .padding(.bottom, 14)
            }
            .padding(.horizontal)
        }
    }
}

private func makeFaceImage(symbolName: String,
                           bg: UIColor = .yellow,         // <----- farba pozadia
                           fg: UIColor = .orange,         // <----- farba symbolu
                           rotationDeg: CGFloat = -90,    // <----- uhol rotácie
                           size: CGFloat = 1024,          // väčšie = ostrejšie
                           symbolScale: CGFloat = 1) -> UIImage {
    let s = CGSize(width: size, height: size)
    let renderer = UIGraphicsImageRenderer(size: s)
    return renderer.image { _ in
        // 1) žlté pozadie – plný kruh
        bg.setFill()
        UIBezierPath(ovalIn: CGRect(origin: .zero, size: s)).fill()

        // 2) priprav SF symbol
        let cfg = UIImage.SymbolConfiguration(pointSize: size * symbolScale, weight: .bold)
        guard let sym = UIImage(systemName: symbolName, withConfiguration: cfg)?
                .withTintColor(fg, renderingMode: .alwaysOriginal) else { return }

        // 3) pootoč symbol okolo stredu o -45°
        let radians = rotationDeg * .pi / 180
        let center = CGPoint(x: s.width/2, y: s.height/2)

        // nakreslíme symbol do pootočeného kontextu tak, aby bol stred presne v strede
        UIGraphicsGetCurrentContext()?.saveGState()
        UIGraphicsGetCurrentContext()?.translateBy(x: center.x, y: center.y)
        UIGraphicsGetCurrentContext()?.rotate(by: radians)
        let rect = CGRect(x: -sym.size.width/2, y: -sym.size.height/2,
                          width: sym.size.width, height: sym.size.height)
        sym.draw(in: rect)
        UIGraphicsGetCurrentContext()?.restoreGState()
    }
}

final class CoinSceneController: ObservableObject {
    enum Result { case heads, tails }

    let scene = SCNScene()
    let cameraNode = SCNNode()
    private let coinNode = SCNNode()

    @Published var isFlipping = false                      // <— zámok počas letu
    private let startPosition = SCNVector3(0, 0, 0)      // <— “domovská” pozícia
    
    // Tunables
    private let flipDuration: TimeInterval = 1.2 // <----- make flip longer/shorter
    private let spinsCountRange = 1...3       // <----- number of full spins before settling

    init() {
        // Camera
        cameraNode.camera = SCNCamera()
        cameraNode.position = SCNVector3(0, 1.2, 3.2)
        cameraNode.look(at: SCNVector3(0, 0.5, 0))
        scene.rootNode.addChildNode(cameraNode)

        // Lights
        let key = SCNNode()
        key.light = SCNLight()
        key.light?.type = .omni
        key.position = SCNVector3(2, 6, 4)
        scene.rootNode.addChildNode(key)

        let ambient = SCNNode()
        ambient.light = SCNLight()
        ambient.light?.type = .ambient
        ambient.light?.intensity = 700
        scene.rootNode.addChildNode(ambient)

        /// --- COIN ---
        let coin = SCNCylinder(radius: 0.5, height: 0.06)

        // hrana – môže ostať oranžová “kovová”
        let edge = SCNMaterial()
        edge.diffuse.contents  = UIColor(red: 0.82, green: 0.82, blue: 0.85, alpha: 1.0) // strieborno-sivá
        edge.metalness.contents = 0.9
        edge.roughness.contents = 0.35

        // tváre: žlté pozadie + oranžový symbol, pootočené o -45°
        let headsImg = makeFaceImage(symbolName: "h.circle",    // <----- zmeň na "h.circle.fill" ak chceš plnú verziu
                                     bg: .init(
                                        red: 255/255,
                                        green: 223/255,
                                        blue: 0/255,
                                        alpha: 1
                                    ),               // <----- pozadie
                                     fg: .init(
                                        red: 212/255,
                                        green: 175/255,
                                        blue: 55/255,
                                        alpha: 1
                                    ),               // <----- farba symbolu
                                     rotationDeg: -90)

        let tailsImg = makeFaceImage(symbolName: "t.circle",
                                     bg: .init(
                                        red: 255/255,
                                        green: 223/255,
                                        blue: 0/255,
                                        alpha: 1
                                    ),               // <----- pozadie
                                     fg: .init(
                                        red: 212/255,
                                        green: 175/255,
                                        blue: 55/255,
                                        alpha: 1
                                    ),
                                     rotationDeg: -90)

        let heads = SCNMaterial()
        heads.diffuse.contents = headsImg
        heads.lightingModel = .constant          // <----- farby nebudú tmavnúť svetlom
        heads.diffuse.wrapS = .clamp; heads.diffuse.wrapT = .clamp

        let tails = SCNMaterial()
        tails.diffuse.contents = tailsImg
        tails.lightingModel = .constant
        tails.diffuse.wrapS = .clamp; tails.diffuse.wrapT = .clamp

        // poradie materiálov pre SCNCylinder: [side, top(+Y), bottom(-Y)]
        coin.materials = [edge, heads, tails]
        coinNode.geometry = coin
        coinNode.position = startPosition          // <— namiesto (0,0,0) alebo pevnej hodnoty
        scene.rootNode.addChildNode(coinNode)

        // Start baseline = Heads up (top +Y shows heads)
        coinNode.eulerAngles = SCNVector3Zero
    }

    @discardableResult
    func flip(to forced: Result? = nil) -> Result {
        let result = forced ?? (Bool.random() ? .heads : .tails)

        // ak už práve letí, ignoruj ďalší flip (zostane zamknuté)
        if isFlipping { return result }

        isFlipping = true

        // 0) baseline pre istotu
        coinNode.removeAllActions()
        coinNode.position = startPosition
        coinNode.eulerAngles = SCNVector3(0, 0, 0)

        // --- TUNABLES ---
        let tUp: TimeInterval   = 0.45 * flipDuration
        let tDown: TimeInterval = 0.55 * flipDuration
        let flightDur = tUp + tDown
        let jump: CGFloat = 1.3
        let yaw = CGFloat.random(in: -0.01...0.01)
        let fullTurns = CGFloat(Int.random(in: spinsCountRange)) * (.pi * 2)
        let finalHalf: CGFloat = (result == .heads) ? 0.0 : .pi
        // ---------------

        // 1) Vertikálny pohyb (len počas letu)
        let up = SCNAction.moveBy(x: 0, y:  jump, z: 0, duration: tUp)
        let down = SCNAction.moveBy(x: 0, y: -jump, z: 0, duration: tDown)
        up.timingMode = .easeInEaseOut
        down.timingMode = .easeInEaseOut
        let flight = SCNAction.sequence([up, down])

        // 2) Spin len počas letu – skončí presne na správnej strane
        let spin = SCNAction.rotateBy(x: fullTurns + finalHalf, y: yaw, z: 0, duration: flightDur)
        spin.timingMode = .easeInEaseOut

        // 3) Po dopade “zacvakni” presnú orientáciu a odomkni tlačidlo
        let clampOnLand = SCNAction.run { [weak self] _ in
            guard let self = self else { return }
            let targetX: CGFloat = (result == .heads) ? 0.0 : .pi
            self.coinNode.eulerAngles = SCNVector3(targetX, 0, 0)
        }

        let unlock = SCNAction.run { [weak self] _ in self?.isFlipping = false }

        // (voliteľné) malý odskok po dopade – bez rotácie
        let bounce = SCNAction.sequence([
            .moveBy(x: 0, y: 0.02, z: 0, duration: 0.06),
            .moveBy(x: 0, y: -0.02, z: 0, duration: 0.08)
        ])
        bounce.timingMode = .easeOut

        // 4) Spustiť
        let group = SCNAction.group([flight, spin])
        coinNode.runAction(.sequence([group, clampOnLand, bounce, unlock]))

        return result
    }

    func reset() {
        coinNode.removeAllActions()
        coinNode.position = startPosition
        coinNode.eulerAngles = SCNVector3Zero
        isFlipping = false
    }
}

#Preview {
    CoinSceneView()
}
