const inputBar = document.querySelector('#searchUser');
const github = new GitHub();
const appUi = new Ui();
inputBar.addEventListener('keyup', searchGitHubApiForUsers);

function searchGitHubApiForUsers(event) {
    const inputText = event.target.value;
    if(inputText === '') {
        appUi.hideProfile();
    } else {
        github.getUser(inputText).then(data => {
            appUi.showProfile(data.profileInfo)
        });
        github.getUserRepos(inputText).then(data => {
            appUi.showReposOfTheUser(data.reposInfo);
        });
    }
}