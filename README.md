# i-dont-know

## TODO

* Auto deploy gh-pages through Travis
  * cd build
  * git init
  * git remote add origin git@github.com:rpellerin/i-dont-know.git
  * git fetch origin
  * git add -A
  * git commit --no-verify -m 'Release'
  * git checkout -b gh-pages origin/gh-pages
  * git cherry-pick master --strategy-option theirs
  * git push
* Cool font + Variable fonts: https://medium.com/clear-left-thinking/how-to-use-variable-fonts-in-the-real-world-e6d73065a604 & https://css-tricks.com/one-file-many-options-using-variable-fonts-web/
* Use grid-auto-flow: dense