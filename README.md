# better-bitbucket
A Chrome browser plugin to improve the Bitbucket pull request experience.

I wanted to use [CSS only](https://github.com/mikeybeck/bitbucket-css), but quickly realised I wasn't going to be able to do as much as I would have liked.
So I've started this really basic plugin which simply injects some CSS & JS into the page.

I spend a lot of time reviewing pull requests on Bitbucket, and in my opinion both the old and new PR UI's could be improved significantly.  This plugin works with the old UI only, and makes it a bit easier to use, IMHO.

## What it does:
- Adds a sidebar containing a list of the modified files.  The currently viewed file is higlighted in the list.
- Removes the pluses and minuses from the start of each line
- Stickies the main PR header to the top of the page
- Adds the 'watch pull request' and commit status links to the top header
- Stickies the currently viewed file header to the top of the page
- Adds a show/hide comments button to each file header
- Hides the code changes on the 'open pull request' page by default, to prevent it taking ages when switching between branches.

### Issues/Things to note:
- In order to display nicely, the left hand sidebar needs to be be minimised (unless you have a very wide monitor)
- Very long lines of code extend beyond the edge of the visible area.  I hope to fix this soon.
