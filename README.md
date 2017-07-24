# Accessible PencilCode Prototype
This is an accessible prototype simulating PencilCode, a block-based visual programming language (VPL) for a pilot accessibility experiment that investigates the most appropriate auditory cues to bring programming to blind or visually-impaired persons.

This prototype was developed at the University of North Texas, Department of Computer Science and Engineering.

## Auditory cues
Currently, there are three types of auditory cues:
- speech (from screen reader): synthesized speech from user's own screen reader
- earcons: abstract musical sounds
- spearcons: sped-up speech

Earcons were created by team members in GarageBand. Spearcons were created by feeding words into Apple's Speech Synthesis API and then saving these to AIFF files (later being converted to MP3 files for use on the prototype).

## Technologies used
This PencilCode prototype uses JavaScript, including the prominent jQuery JavaScript library, and a pure JavaScript-based audio handling library called Howler.js. Additionally, this PencilCode prototype also uses the Web Speech API in a limited fashion. (While the Web Speech API is experimental, it is supported by all recent versions of popular browsers Chrome, Firefox, and Safari, as of July 2017.) To ensure screen reader support, this prototype makes use of WAI-ARIA specifications.

## Supported platforms
This prototype supports the following operating system + screen reader combinations:
- Windows + JAWS
- Windows + NVDA
- macOS + VoiceOver

This prototype supports the following operating system + browser combinations:
- Windows + Chrome
- Windows + Firefox
- macOS + Safari
- macOS + Chrome
- macOS + Firefox
