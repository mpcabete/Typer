---
template: blog-post
title: Changelog
slug: /changelog
date: 2021-03-21 05:49
description: A development log of the changes made to the website.
featuredImage: /assets/chris-lawton-5IHz5WhosQE-unsplash.jpg
---

 
 <br/>

### 3/23/21

---

**added** Custom language setting
**updated** line chart x axis settings to choose between time and round
**updated** line chart adding circles indicating datapoints
**updated** history entrys in stats page, adding delete button


### 3/20/21

 ---

- **added** custom color in the text characters in a way that each color represent a *finger* when touch typing
- **added** *keyboard layout* on screen during challenge
- **added** the first two options in the *settings page*
  - solid color in the text
  - ignore backspace enforcement

### 3/19/21

---

- **added** the option to *select the challenges* that appears in the stats page graphs

### 3/18/21

---

- **added** the *clallenges history* visualization in the stats page 

### 3/17

---

- **updated** the metadata and landing page information
  
### 16/3/21

---

- **updated** the *domain* to a custom url  
- **added** google analytics  

### 14/3/21

---

- **updated** app dinamic route and *navbar*  
- **added** wpm and accuracy *line graphs* to stats page  
- **updated** css styles in the stats page  

### 11/3/21

---

- **bugfix** *acc change indicator* breaks if there is no previous challenge
- **added** wpm change indicator
- **updated** post clallenge screen's character *latency visualization* colors 
- **added** character *latency visualization's* legend

### 10/3/21

---

- **added** static file site with a dinamic subtomain for the app
- **bugfix** the misstype isn't computed when it's the right key but there is a previous misstype queued in the backspace list
- **added** persistent storage of previous challenges in the browser's local storage
- **added** accuracy statistic in the post challenge screen
- **added** accuracy difference from the previous challenge indicator

### 9/3/21

---

- **updated** whitespace representation
- **updated** placeholder text to randon english words

### 8/3/21

---

- **added** timer
- **added** the start challenge feature
- **updated** the play page into a different page from the challenge

### 7/3/21

---

- **bugfix** non alphanumerical keys beeing added to the backspace queue
- **bugfix** space bar scrolling the page down when pressed

### 6/3/21

---

- **added** placeholder text as a svg element
- **updated** text style into a fade gradient
- **added** event logger
- **added** misstypes counter
- **added** backspace queue

### 5/3/21

- **added** basic template
- **added** event listener
- **added** key event handler