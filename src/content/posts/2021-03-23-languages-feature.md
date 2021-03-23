---
template: blog-post
title: We now support 39 languages
slug: /languages-common-words
date: 2021-03-23 10:33
description: We have implemented 39 languages in our most common words free typing practice
featuredImage: /assets/amador-loureiro-BVyNlchWqzs-unsplash.jpg
---

A lot of typing websites are either english only or you have to pay to practice with the common words in your language. Here it is as easy as going to the settings window and choosing yours!  

# How is it made?

## The data:
The [data](https://opus.nlpl.eu/OpenSubtitles2018.php) used to generate this was kindly provided from [open subtitles](https://www.opensubtitles.org), the data consists in an list of words for each language and the number of occurrences in the subtitles database.  

### Why subtitles?

>From a linguistic pective, subtitles cover a wide an interesting breadth of genres, from colloquial language or slang to narrative and explanatory discourse(as in e.g documentaries)  
[Pierre Lison, 2016](http://www.lrec-conf.org/proceedings/lrec2016/pdf/947_Paper.pdf)

## Random word selection

To generate the random words for training our typing skills I thought that a good idea was that the probability for a word to be drawn be equivalent to its frequency in the language.  
To achieve this, we can draw a number between 0 and the total number of word occurences in the dataset, and use this number to choose a word.  
We can think of each word occurence in the dataset as a raffle ticket, if the word has a lot of tickets it will appear more frequently than a word with only a few.  

## Supported Languages:
- Arabic – ar
- Bulgarian – bg
- Czech – cs
- Danish – da
- German – de
- Greek – el
- English – en
- Spanish – es
- Estonian – et
- Farsi – fa
- Finnish – fi
- French – fr
- Hebrew – he
- Croatian – hr
- Hungarian – hu
- Indonesian – id
- Icelandic – is
- Italian – it
- Korean – ko
- Lithuanian – lt
- Latvian – lv
- Macedonian – mk
- Malay – ms
- Dutch – nl
- Norwegian – no
- Polish – pl
- Portuguese – pt
- Portuguese Brazilian – pt-br
- Romanian – ro
- Russian – ru
- Slovak – sk
- Slovenian – sl
- Albanian – sq
- Serbian Cyrillic – sr-Cyrl
- Serbian Latin – sr-Latn
- Swedish – sv
- Turkish – tr
- Ukrainian – uk
- Simplified Chinese – zh-CN

** Currently non alphanumeric characters such as (ã, é, ê, ect.) are not supported, but i am are working on it 😉



