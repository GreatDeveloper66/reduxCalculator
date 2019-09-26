#DEVELOPMENT PROCEDURES

##CODING STYLES
###JAVASCRIPT: STANDARD STYLE
[StandardJS]HTTPS://STANDARDJS.COM
[GitHub](GITHUB.COM/STANDARD/STANDARD)
###CSS STYLES
For this project we will use grid for the layout. 

###COMMITS
* Four types of commits: bug(fixing code problem), feature(adding a new feature), refactor(improving code), style(css/scss styling).
* Each commit should be a single step for a specific type of change being made[can span multiple files].
* Commits should be frequent and each commit should signify a discrete change in code.
* These commits should be frequently pushed to the matching working branch in the GitHub repository not the development or working branch.

###GIT HUB REPOSITORY STRUCTURE
* Master Branch: The github repository will consist of the master branch which represents the current app version fully tested, verfied and ready for deployment. This branch reflects the current production release. Do not push code here.
* Development Branch: The development branch will represent the current development of the project as updates are made. This branch will not be changed until the contributors' code has been tested and reviewed. Do not push code here.
* Working Branches: Individual branches for each change to the project by each developer. These branches will be named based on the convention below. Work and make changes on this branch locally. Test the code. Then merge the deployment branch into this local branch and make a pull request.

###PULL AND MERGE PROCESS
1. `Git Pull`
2. Work off of development branch. Create a seperate branch for your local work
	1. `git checkout -b [fix]/[my branch]`
	2. fix should be bug,feature,refactor or style. my branch should be a name you choose to signfiy the change/change(s) being made.
3. Make changes to code
	1. commit at each significant change in code.
	2. push this commit the working branch in the GitHub repository.
4. After changes are made, review and test code according to testing procedure.
5. Pull from development branch
	1. `git checkout development`
	2. `git pull`
6. Merge your changes with the development branch.
	1. `git checkout [fix]/[my branch]`
	2. `git merge development`
7. You are now on your branch with current development branch merged into those changes. If there are any merge conflicts inform whoever is in charge of the GitHub repository. Do not proceed until merge conflicts have been resolved.	
8. Make pull request
9. If the pull request is approved changes will be merged into development branch.
10. If pull request is not approved, person in charge or repository will communicate issues to developer. The developer will then fix/address those issues and resubmit a pull request. 
11. When many new or changed features are ready to be promoted to a new production released, those features will be tested together. If the features pass, a pull request will be made to merge the new production code into the master branch. 

###TESTING PROCEDURE
Before merging with deployment branch test the code to ensure all of the features and functions of the function are working correctly. Ensure that the new code meets the following requirements:
* No software bugs meaning the code works as intended.
* No interference with other features. The new code does not degrade the effeciveness of other features in the app.
* Review Code to ensure it is readable and organized according to current standards.
