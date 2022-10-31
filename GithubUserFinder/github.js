class GitHub {
    constructor() {
        this.clientId = '8a228d9a930a8dde5f23';
        this.clientSecret = 'a037ec34068b8a1ce21be9cf57055b5f5beb39e1';
        this.reposCount = 5;
        this.reposSort = 'created: asc'
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.clientId}&client_secret=${this.clientSecret}`);
        const profileInfo = await profileResponse.json(); // dont use JSON.parse(profileResponse) - this is invoked on the promise of the object not on the object
        console.log(profileInfo)
        return {profileInfo}
    }

    async getUserRepos(user) {
        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.reposCount}&sort=${this.reposSort}&client_id=${this.clientId}&client_secret=${this.clientSecret}`);
        const reposInfo = await reposResponse.json();
        console.log(reposInfo);
        return {reposInfo};
    }
}
