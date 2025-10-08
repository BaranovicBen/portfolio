// NeonBeats Music Database
// Demo songs with time-coded lyrics for synchronization

const SONGS = [
    {
        id: 1,
        title: "The Fate of Ophelia",
        artist: "Taylor Swift",
        album: "The Life of a Showgirl",
        duration: 238,
        genre: "pop",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/f/f4/Taylor_Swift_–_The_Life_of_a_Showgirl_%28album_cover%29.png",
        mp3: "audio/Taylor Swift - The Fate Of Ophelia.mp3", 
        lyrics: [
            { t: 11, text: "I heard you calling" },
            { t: 13, text: "On the megaphone" },
            { t: 15, text: "You wanna see me all alone" },
            { t: 21, text: "As legend has it you" },
            { t: 23, text: "Are quite the pyro" },
            { t: 25, text: "You light the match to watch it blow" },
            { t: 29, text: "And if you'd never come for me" },
            { t: 33, text: "I might've drowned in the melancholy" },
            { t: 36, text: "I swore my loyalty to me, myself and I" },
            { t: 40, text: "Right before you lit my sky up" },

            { t: 46, text: "All that time" },
            { t: 48, text: "I sat alone in my tower" },
            { t: 49, text: "You were just honing your powers" },
            { t: 51, text: "Now I can see it all (see it all)" },

            { t: 56, text: "Late one night" },
            { t: 57, text: "You dug me out of my grave and" },
            { t: 59, text: "Saved my heart from the fate of" },
            { t: 61, text: "Ophelia" },

            { t: 65, text: "Keep it one hundred" },
            { t: 66, text: "On the land, the sea, the sky" },
            { t: 69, text: "Pledge allegiance to your hands" },
            { t: 71, text: "Your team, your vibes" },
            { t: 73, text: "Don't care where the hell you been" },
            { t: 75, text: "'Cause now you're mine" },
            { t: 77, text: "It's 'bout to be the sleepless night" },
            { t: 78, text: "You've been dreaming of" },
            { t: 82, text: "The fate of Ophelia" },

            { t: 86, text: "The eldest daughter of a nobleman" },
            { t: 90, text: "Ophelia lived in fantasy" },
            { t: 95, text: "But love was a cold bed full of scorpions" },
            { t: 100, text: "The venom stole her sanity" },
            { t: 104, text: "And if you'd never come for me" },
            { t: 108, text: "I might've lingered in purgatory" },
            { t: 112, text: "You wrap around me like a chain, a crown, a vine" },
            { t: 116, text: "Pulling me into the fire" },

            { t: 123, text: "All that time" },
            { t: 123, text: "I sat alone in my tower" },
            { t: 125, text: "You were just honing your powers" },
            { t: 127, text: "Now I can see it all (see it all)" },

            { t: 132, text: "Late one night" },
            { t: 133, text: "You dug me out of my grave and" },
            { t: 135, text: "Saved my heart from the fate of" },
            { t: 137, text: "Ophelia" },

            { t: 140, text: "Keep it one hundred" },
            { t: 142, text: "On the land, the sea, the sky" },
            { t: 144, text: "Pledge allegiance to your hands" },
            { t: 147, text: "Your team, your vibes" },
            { t: 149, text: "Don't care where the hell you been" },
            { t: 151, text: "'Cause now you're mine" },
            { t: 153, text: "It's 'bout to be the sleepless night" },
            { t: 154, text: "You've been dreaming of" },
            { t: 157, text: "The fate of Ophelia" },

            { t: 160, text: "'Tis locked inside my memory" },
            { t: 161, text: "And only you possess the key" },
            { t: 164, text: "No longer drowning and deceived" },
            { t: 166, text: "All because you came for me" },
            { t: 167, text: "Locked inside my memory" },
            { t: 169, text: "And only you possess the key" },
            { t: 171, text: "No longer drowning and deceived" },
            { t: 173, text: "All because you came for me" },

            { t: 178, text: "All that time" },
            { t: 179, text: "I sat alone in my tower" },
            { t: 181, text: "You were just honing your powers" },
            { t: 184, text: "Now I can see it all (I can see it all)" },

            { t: 188, text: "Late one night" },
            { t: 190, text: "You dug me out of my grave and" },
            { t: 191, text: "Saved my heart from the fate of" },
            { t: 193, text: "Ophelia" },

            { t: 197, text: "Keep it one hundred" },
            { t: 199, text: "On the land, the sea, the sky" },
            { t: 201, text: "Pledge allegiance to your hands" },
            { t: 203, text: "Your team, your vibes" },
            { t: 205, text: "Don't care where the hell you been" },
            { t: 207, text: "'Cause now you're mine" },
            { t: 209, text: "It's 'bout to be the sleepless night" },
            { t: 211, text: "You've been dreaming of" },
            { t: 214, text: "The fate of Ophelia" },

            { t: 217, text: "You saved my heart from the fate of" },
            { t: 220, text: "Ophelia" }
            ]
    },
    {
        id: 2,
        title: "Takedown",
        artist: "Huntri/X",
        album: "Kpop Demon Hunters Soundtrack",
        duration: 182,
        genre: "k-pop",
        coverImage: "https://i0.wp.com/zaloraphilippinesblog.wpcomstaging.com/wp-content/uploads/2025/07/511266575_1633564650839877_1392801157667834489_n.jpg?resize=720%2C720&ssl=1",
        mp3: "audio/Takedown.mp3",
        lyrics: [
        { t: 0, text: "Takedown, takedown" },
        { t: 2, text: "Takedown, down, down, down (HUNTR/X girls to the world)" },
        { t: 5, text: "Takedown, takedown" },
        { t: 7, text: "Takedown, down, down, down (it's a takedown)" },

        { t: 10, text: "So sweet, so easy on the eyes, but hideous on the inside" },
        { t: 14, text: "Whole life spreadin' lies, but you can't hide, baby, nice try" },
        { t: 18, text: "I'm 'bout to switch up these vibes, I finally opened my eyes" },
        { t: 22, text: "It's time to kick you straight back into the night" },

        { t: 25, text: "'Cause I see your real face, and it's ugly as sin" },
        { t: 28, text: "Time to put you in your place 'cause you're rotten within" },
        { t: 31, text: "When your patterns start to show" },
        { t: 33, text: "It makes the hatred wanna grow outta my veins" },

        { t: 36, text: "I don't think you're ready for the takedown" },
        { t: 40, text: "Break you into pieces in a world of pain 'cause you're all the same" },
        { t: 44, text: "Yeah, it's the takedown" },
        { t: 47, text: "A demon with no feelings don't deserve to live, it's so obvious" },

        { t: 51, text: "I'ma gear up and take you down (whoa-oh, da-da-da, down)" },
        { t: 55, text: "It's a takedown (whoa-oh, da-da-da, down)" },
        { t: 59, text: "I'ma take it down (whoa-oh, da-da-da, down)" },
        { t: 63, text: "It's a takedown (whoa-oh, da-da-da, down)" },

        { t: 67, text: "Take it down" },
        { t: 69, text: "It's a takedown, I'ma take you out, you'll break down like, \"What?\"" },
        { t: 73, text: "It's a takedown, I'ma take you out, and it ain't gonna stop" },
        { t: 77, text: "정신을 놓고, 널 짓밟고, 칼을 새겨놔" },
        { t: 81, text: "You'll be beggin' and cryin', all of you dyin', never miss my shot" },

        { t: 85, text: "When your patterns start to show" },
        { t: 87, text: "It makes the hatred wanna grow outta my veins" },

        { t: 90, text: "I don't think you're ready for the takedown" },
        { t: 94, text: "당당하게 어둠 앞에 다가서, 다 무너뜨려" },
        { t: 98, text: "Yeah, it's the takedown" },
        { t: 101, text: "A demon with no feelings don't deserve to live, it's so obvious" },

        { t: 106, text: "I'ma gear up and take you down (whoa-oh, da-da-da, down)" },
        { t: 110, text: "It's a takedown (whoa-oh, da-da-da, down)" },
        { t: 114, text: "I'ma take it down (woah-oh, da-da-da, down, watch me do it, yeah, ooh)" },
        { t: 118, text: "It's a takedown (whoa-oh, da-da-da, down, ooh)" },

        { t: 122, text: "Oh, you're the master of illusion" },
        { t: 125, text: "나를 속이려 하지 마" },
        { t: 128, text: "Look at all the masses that you're foolin'" },
        { t: 132, text: "But they'll turn on you soon, so how?" },

        { t: 135, text: "How can you sleep or live with yourself?" },
        { t: 138, text: "A broken soul trapped in the nastiest shell" },
        { t: 141, text: "영혼 없는 네 목숨을 끊으러, and watch you die-ie-ie" },
        { t: 145, text: "You can try, but you can't hide" },

        { t: 149, text: "It's a takedown, I'ma take you out, you'll break down like, \"What?\"" },
        { t: 153, text: "It's a takedown, I'ma take you out, and it ain't gonna stop" },
        { t: 157, text: "I'ma cut you open, lose control, then rip out your heart" },
        { t: 161, text: "You'll be beggin' and cryin', all of you dyin'" },

        { t: 165, text: "I'ma gear up and take you down (whoa-oh, da-da-da, down, ah)" },
        { t: 169, text: "It's a takedown (whoa-oh, da-da-da, down, yeah-yeah, yeah-yeah, yeah)" },
        { t: 174, text: "I'ma take it down (whoa-oh, da-da-da, down, ooh)" },
        { t: 178, text: "It's a takedown (whoa-oh, da-da-da, down, watch me do it, yeah)" },
        { t: 182, text: "Take it down" }
        ]
    },
    {
        id: 3,
        title: "Circles",
        artist: "Post Malone",
        album: "Hollyvood's Bleeding",
        duration: 212, 
        genre: "pop",
        coverImage: "https://i1.sndcdn.com/artworks-9eDXZyDaKdxirdWF-xz4esw-t500x500.jpg",
        mp3: "audio/Post Malone - Circles.mp3",
        lyrics: [
        { t: 0, text: "Oh, oh, oh" },
        { t: 3, text: "Oh, oh, oh" },
        { t: 6, text: "Oh, oh, oh, oh, oh" },

        { t: 10, text: "We couldn't turn around" },
        { t: 13, text: "'Til we were upside down" },
        { t: 16, text: "I'll be the bad guy now" },
        { t: 19, text: "But know I ain't too proud" },
        { t: 23, text: "I couldn't be there" },
        { t: 26, text: "Even when I tried" },
        { t: 29, text: "You don't believe it" },
        { t: 32, text: "We do this every time" },

        { t: 36, text: "Seasons change and our love went cold" },
        { t: 40, text: "Feed the flame 'cause we can't let go" },
        { t: 44, text: "Run away, but we're running in circles" },
        { t: 48, text: "Run away, run away" },
        { t: 52, text: "I dare you to do something" },
        { t: 56, text: "I'm waiting on you again" },
        { t: 59, text: "So I don't take the blame" },
        { t: 63, text: "Run away, but we're running in circles" },
        { t: 67, text: "Run away, run away, run away" },

        { t: 72, text: "Let go" },
        { t: 74, text: "I got a feeling that it's time to let go" },
        { t: 78, text: "I say so" },
        { t: 80, text: "I knew that this was doomed from the get-go" },
        { t: 84, text: "You thought that it was special, special" },
        { t: 88, text: "But it was just the sex, though, the sex, though" },
        { t: 92, text: "And I still hear the echoes (the echoes)" },
        { t: 96, text: "I got a feeling that it's time to let it go, let it go" },

        { t: 100, text: "Seasons change and our love went cold" },
        { t: 104, text: "Feed the flame 'cause we can't let go" },
        { t: 108, text: "Run away, but we're running in circles" },
        { t: 112, text: "Run away, run away" },
        { t: 116, text: "I dare you to do something" },
        { t: 120, text: "I'm waiting on you again" },
        { t: 124, text: "So I don't take the blame" },
        { t: 128, text: "Run away, but we're running in circles" },
        { t: 132, text: "Run away, run away, run away" },

        { t: 137, text: "Maybe you don't understand what I'm going through" },
        { t: 142, text: "It's only me" },
        { t: 144, text: "What you got to lose?" },
        { t: 147, text: "Make up your mind, tell me, what are you gonna do?" },
        { t: 152, text: "It's only me" },
        { t: 154, text: "Let it go" },

        { t: 158, text: "Seasons change and our love went cold" },
        { t: 162, text: "Feed the flame 'cause we can't let go" },
        { t: 166, text: "Run away, but we're running in circles" },
        { t: 170, text: "Run away, run away" },
        { t: 174, text: "I dare you to do something" },
        { t: 178, text: "I'm waiting on you again" },
        { t: 182, text: "So I don't take the blame" },
        { t: 186, text: "Run away, but we're running in circles" },
        { t: 190, text: "Run away, run away, run away" }
        ]
    },
    {
        id: 4,
        title: "DENIAL IS A RIVER",
        artist: "Doechii",
        album: "Alligator Bites Never Heal",
        duration: 159, 
        genre: "rap",
        coverImage: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgEQLGBa16X91EMEI8GxpQp11HWnGIwINKRxALa_nfJZFgMbGkpL6lKbA4mVbr-Km-3-S6ZWEguu9oqp2c8lt4wXKgA3rMhB7BqTnFhskTz9S4tiBLM0y7fGaz312xl7P_pwr_taWwVRSJxaEIwiJm4Bl-WlW5paPHg9_sSTjWiEtnDti-w6tKJaje8mas2/s16000/Doechii%20Denial%20Is%20%20A%20River%20-%20Song%20of%20the%20Week.jpeg",
        mp3: "audio/Doechii - DENIAL IS A RIVER.mp3",
        lyrics: [
        { t: 0, text: "What's up, Doechii? (Hey, girl)" },
        { t: 4, text: "You know it's been a lil' minute since you and I" },
        { t: 8, text: "Have had a chat (has it really?)" },
        { t: 11, text: "Probably since, like, your last EP, \"Oh The Places You'll Go\"" },
        { t: 15, text: "(Oh, wow) yeah (it's been a minute, yeah)" },
        { t: 18, text: "I've been gettin' some calls (oh?)" },
        { t: 21, text: "People are a little bit worried about you (not worried, okay)" },
        { t: 25, text: "And I know that I was kinda that outlet for you, so (you were)" },
        { t: 30, text: "Why don't you just tell me what's been goin' on? (Okay)" },

        { t: 34, text: "Remember old dude from 2019" },
        { t: 37, text: "Nice clean nigga did me dirtier than laundry (than laundry)" },
        { t: 41, text: "Took a scroll through his IG" },
        { t: 44, text: "Just to get a DM from his wifey? (What the fuck?)" },
        { t: 48, text: "I was so confused, what should Doechii do?" },
        { t: 51, text: "She didn't know about me and I didn't know 'bout Sue" },
        { t: 55, text: "I open up the messages, then had to hit the zoom" },
        { t: 59, text: "Turns out the girl was really a dude (goddamn)" },
        { t: 63, text: "Nigga think he slicked back 'til I slipped back" },
        { t: 66, text: "Got my lick back, turned a nigga to a knick-knack (to a knick-knack)" },
        { t: 70, text: "I moved on, dropped a couple of songs" },
        { t: 73, text: "And then I went and got signed, now it's 2021" },

        { t: 77, text: "Okay, I just feel like this is the perfect opportunity for us to just" },
        { t: 82, text: "Take a second and kind of unpack what's happened to you" },
        { t: 86, text: "You know, this guy cheated on you, and -" },
        { t: 89, text: "Mm, nah (oh), fuck it" },
        { t: 92, text: "\"Platinum record\" this, \"Viral record\" that" },
        { t: 96, text: "I'm makin' so much money, I'm all over the net" },
        { t: 100, text: "I'm movin' so fast, no time to process" },
        { t: 103, text: "And, no, I'm not in a gang, but I'm always on set (yeah)" },
        { t: 107, text: "Wristwatch, drip drop, labels want the TikToks" },
        { t: 110, text: "Now I'm makin' TikTok music, what the fuck?" },
        { t: 113, text: "I need a cleanse, need a detox" },
        { t: 116, text: "But we ain't got time to stop, the charts need us (and they do)" },
        { t: 120, text: "Fast forward, me, 2023" },
        { t: 123, text: "I'm stackin' lots of cheese and makin' money" },
        { t: 126, text: "My grass is really green, and -" },
        { t: 129, text: "Honestly, I can't even fucking cap no more" },
        { t: 132, text: "This is a really dark time for me, I'm goin' through a lot" },
        { t: 136, text: "(By \"a lot,\" you mean drugs?) Um, I wouldn't -" },
        { t: 139, text: "(Drugs?) No, it's a -, (no?) It's a natural plant" },
        { t: 142, text: "(No, I'm not judging) I'm not an addict" },
        { t: 144, text: "(I'm just sayin') I don't think -" },
        { t: 146, text: "(You wanna talk about it?) Uh" },

        { t: 148, text: "I mean, fuck, I like pills, I like drugs" },
        { t: 151, text: "I like gettin' money, I like strippers, I like to fuck" },
        { t: 154, text: "I like day-drinkin' and day parties and Hollywood" },
        { t: 156, text: "I like doin' Hollywood shit, snort it? Probably would (yeah)" },
        { t: 159, text: "What can I say? The shit works, it feels good" },
        { t: 162, text: "And my self-worth's at an all-time low" },
        { t: 165, text: "And just when it couldn't get worse" },
        { t: 168, text: "My ex crashed my place and destroyed all I owned (yeah)" },
        { t: 171, text: "Whoopsie, made a oopsie" },
        { t: 174, text: "100,000-dollar oops made me loopy (yeah)" },
        { t: 177, text: "I ain't a killer, but don't push me" },
        { t: 180, text: "Don't wanna have to turn a nigga guts into soup beans" },

        { t: 184, text: "Whoa, whoa, whoa, whoa, whoa (rurr), okay, Doechii" },
        { t: 188, text: "We don't wanna revert back into our old ways (sorry, okay)" },
        { t: 191, text: "So we're gonna try a breathin' exercise, okay? (Alright, word)" },
        { t: 195, text: "When I breathe (okay), you breathe" },
        { t: 197, text: "Alright? Let's go (what?)" },
        { t: 199, text: "Uh-uh-ooh, uh-uh-ah" },
        { t: 202, text: "Uh, uh, uh, ah" },
        { t: 204, text: "Uh, uh, uh-uh-ah" },
        { t: 206, text: "Uh-uh-uh-uh-ah, whoo-sah!" }
        ]
    },
    {
        id: 5,
        title: "Guess (ft. Billie Eilish)",
        artist: "Charli xcx",
        album: "brat",
        duration: 171,
        genre: "electronic",
        coverImage: "https://f4.bcbits.com/img/a2626865381_10.jpg",
        mp3: "audio/Charli xcx - Guess.mp3",
        lyrics: [
        { t: 0,  text: "Uh" },
        { t: 3,  text: "You wanna guess the colour of my underwear" },
        { t: 7,  text: "You wanna know what I got going on down there" },
        { t: 11, text: "Is it pretty in pink or all see-through?" },
        { t: 15, text: "Is it showing off my brand new lower back tattoo?" },

        { t: 19, text: "You wanna put 'em in your mouth, pull 'em all down south" },
        { t: 22, text: "You wanna turn this shit out, that's what I'm talking about" },
        { t: 25, text: "Pu-pu-put 'em in your mouth, pull 'em all down south" },
        { t: 28, text: "You wanna turn this shit out, that's what I'm talking about (yeah)" },

        { t: 31, text: "Try it, bite it, lick it, spit it" },
        { t: 34, text: "Pull it to the side and get all up in it" },
        { t: 37, text: "Wear 'em, post 'em, might remix it" },
        { t: 40, text: "Send them to The Dare, yeah, I think he's with it" },
        { t: 43, text: "Try it, bite it, lick it, spit it" },
        { t: 46, text: "Pull it to the side and get all up in it" },
        { t: 49, text: "Wear 'em, post 'em, might remix it" },
        { t: 52, text: "Send them to The Dare, yeah, I think he's with it" },

        { t: 55, text: "You wanna guess the colour of my underwear" },
        { t: 59, text: "You wanna know what I got going on down there" },
        { t: 63, text: "Is it pretty in pink or all see-through?" },
        { t: 67, text: "Is it showing off my brand new lower back tattoo?" },
        { t: 71, text: "You wanna put 'em in your mouth, pull 'em all down south" },
        { t: 75, text: "You wanna turn this shit out, that's what I'm talking about" },

        { t: 79, text: "You wanna try it, bite it, lick it, spit it" },
        { t: 82, text: "Pull it to the side and get all up in it" },
        { t: 85, text: "Wear 'em, post 'em, might remix it" },
        { t: 88, text: "Send them to The Dare, yeah, I think he's with it" },
        { t: 91, text: "Think he's with it" },

        { t: 93, text: "Guess" },
        { t: 95, text: "Yeah" },
        { t: 97, text: "Yeah" },

        { t: 99, text: "Guess, guess, guess, guess, guess, guess, guess, guess" },
        { t: 103, text: "Guess, guess, guess, guess, guess, guess, guess, guess" },
        { t: 107, text: "Guess, guess, guess, guess, guess, guess, guess, guess" },
        { t: 111, text: "Guess, guess, guess, guess, guess, guess, guess, guess" },

        { t: 121, text: "Guess how much money I just took from this deal" },
        { t: 129, text: "Wanna guess the password to my Google Drive" },
        { t: 139, text: "You wanna guess the address of the party I'm at" },
        { t: 160, text: "You wanna guess if I'm serious about this song" }
        ]
    }
];

// Instructions for adding new songs:
/*
To add a new song to the NeonBeats database:

1. Add a new song object to the SONGS array with the following structure:
   {
     id: [unique number],
     title: "Song Title",
     artist: "Artist Name", 
     album: "Album Name",
     duration: [seconds],
     genre: "[synthwave|cyberpunk|future-bass|industrial]",
     coverImage: "resources/album-cover-[n].jpg",
     mp3: "URL to MP3 file (same-origin preferred)",
     lyrics: [
       { t: [seconds], text: "Lyric line" },
       // ... more time-coded lyrics
     ]
   }

2. Create or use existing album cover images in the resources/ folder
   - Recommended size: 500x500px
   - Format: JPG for compatibility
   - Follow cyberpunk aesthetic with neon colors

3. Add MP3 files to your server or use same-origin URLs
   - For demo purposes, we're using placeholder audio
   - Replace with actual MP3 URLs for full functionality

4. Time-code lyrics by:
   - Listening to the song and noting when each line starts
   - Using audio editing software to get precise timestamps
   - Testing synchronization in the player

5. Test the new song by:
   - Checking if it appears in the library
   - Verifying lyrics sync correctly
   - Ensuring cover art displays properly
*/


if (!window.SONGS) window.SONGS = typeof SONGS !== "undefined" ? SONGS : [];