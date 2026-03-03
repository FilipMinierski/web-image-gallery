# Web-based image/video gallery
The ultimate solution for organising your cat\* memes! This software allows you to:
1. Store all your cat\* images and videos in one place.
2. Organise them by tags.
3. Search them by tags.
4. Access them through an internet browser.
5. Like/dislike them.

Consider the following scenario: you have the perfect cat\* meme to send to the group chat, but you can't find it in your gallery. With this software, you can easily find it by searching for relevant tags, allowing you to always have the perfect cat\* meme for every situation!

\* Not limited to cats. Any images or videos will work too.

## Technical details
Backend writtten using Python's Flask library. 
Database is custom-made and uses .json files. 
Frontent uses Jinja, and vanilla HTML/CSS/JS. 

This project was done as an exercise in web development.

## How to use
Make sure you have python3 installed, as well as the flask package. Flask can be installed using pip:
`pip install flask`

Then simply run app.py using python: `python app.py`

The website can then be accessed at localhost, port 5000: `127.0.0.1:5000`

You may have to allow python through the firewall to eb able to access the website.

This repository includes a few sample images and videos. Try searching for "dog", "cat", "example_tag_a", "example_tag_b", or any combination thereof. The page will only show posts which include all tags in the search query. Adding "-" before a tag will exclude posts with that tag, e.g. searching for "-dog" will only show posts that are not tagged with "dog".

Currently, new posts can only be added manually. This can be done by placing images in /webapp/static/images/, and videos in /webapp/static/videos/, then adding entries to db.json. Posts should have unique IDs, and must follow the format of other posts.
