class Ui {
  constructor() {
    this.profile = document.getElementById('profile');
    this.errorWindow = document.querySelector('#error-placeholder');
  }
  hideProfile() {
    this.profile.innerHTML = '';
  }

  hideErrorWindow() {
    this.errorWindow.innerHTML = ''
  }

  printErrorPrompt(message, classes) {
    
    this.errorWindow.className = classes;
    this.errorWindow.innerHTML = 
    `
    <div class="alert alert-dismissible alert-danger">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>Oups!</strong>${message}
    </div>
    `;
    setTimeout(() => this.hideErrorWindow(), 2500);
  }

  showProfile(userInfo) {
    console.log(userInfo)
    if(userInfo.message !== 'Not Found' && userInfo !== '')
    {
      this.hideErrorWindow();
      this.profile.innerHTML = 
        `
        <div class="card card-body mb-3">
          <div class="row">
            <div class="col-md-3">
              <img src="${userInfo.avatar_url}" class="img-fluid mb-2">
              <a href="${userInfo.html_url}" target="" class="btn btn-primary btn-block mb-4">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge bg-primary">Public Repos: ${userInfo.public_repos}</span>
              <span class="badge bg-secondary">Public Gists: ${userInfo.public_gists}</span>
              <span class="badge bg-success">Followers: ${userInfo.public_followers}</span>
              <span class="badge bg-info">Following: ${userInfo.following}</span>
              <br>
              <br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${userInfo.company}</li>
                <li class="list-group-item">Blog/Website: ${userInfo.blog}</li>
                <li class="list-group-item">Location: ${userInfo.location}</li>
                <li class="list-group-item">Member since: ${userInfo.created_at}</li>
              </ul>
            </div>
          </div>
        </div>
        <div id="repositories" class="card card-body mb-3"><h2>Public repositiories</h2></div>
        `;
    }
    else {
      this.hideProfile();
      this.printErrorPrompt('There is no user with this login', 'error-prompt');
    }
    

  }

  showReposOfTheUser(reposInfo) {
    const repositories = document.createElement('div');
    repositories.id = 'repositories';
    reposInfo.forEach(data => {
      const repo = document.createElement('div');
      repo.id = 'repo';
      repo.innerHTML = `
      <div class="row">
        <div class="col-md-3">
          <a href="${data.html_url}" target="" class="mb-4">${data.name}</a>
          <span class="badge bg-primary">Watchers: ${data.watchers_count}</span>
          <span class="badge bg-secondary">Forks: ${data.forks_count}</span>
          <span class="badge bg-success">Followers: ${data.stargazers_count}</span>
        </div>
      </div>`;
      repositories.appendChild(repo);
    });
    document.getElementById('repositories').appendChild(repositories);
  }
}