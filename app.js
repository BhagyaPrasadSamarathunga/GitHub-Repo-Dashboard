const intRepo = document.getElementById("repoName")
const GIT_REPO_API = 'https://api.github.com/repos/';

const isPopularRepo = (stargazersCount, forksCount) => {
	return (stargazersCount * 1 + forksCount * 2) >= 500 ? 'Popular' : 'Not Popular'
}

async function getRepos() {
    clear();
    const url =[GIT_REPO_API,intRepo.value].join('');
    const response = await fetch(url)
    const result = await response.json()

	var isPopular = isPopularRepo(result.stargazers_count , result.forks_count );
    const anchor = {  
        avatar_url: result.owner.avatar_url,            
        author: result.owner.login,
        repoName: result.name,
        stars: result.stargazers_count,
        forks: result.forks_count,
        popular: isPopular,
        profile:result.html_url
    }
        displayUserInfo(anchor)
    }

    function clear(){
        document.querySelector(".divResult").innerHTML = "";
    }

    const displayUserInfo = function (user) {
    let html;
    html = `
    <div id='info-card' class="info-card-content text-black">
        <div class='user-col' class='user-avatar-container'>
            <img src="${user.avatar_url}" alt="" class="user-avatar">
            <div class='user-info'>
                <h2 class='author'>${user.author}</h2>
                <p class='repo-name'>${user.repoName}</p>
            </div>
        </div>
            
        <div class='git-info'>
            <ul class='user-col' class='row'>
                <li class="user-row">
                    <div class='font-size-regular'>${user.author}</div>
                    <span class="font-size-medium ">Username</span>
                </li>
                <li class="user-row">
                    <div class='font-size-regular'>${user.repoName}</div>
                    <span class="font-size-medium">Repo</span>
                </li>
                <li class="user-row">
                    <div class='font-size-regular'>${user.stars}</div>
                    <span class="font-size-medium">Stars</span>
                </li>
                <li class="user-row">
                    <div class='font-size-regular'>${user.forks}</div>
                    <span class="font-size-medium">Forks</span>
                </li>
                <li class="user-row">
                    <div class='font-size-regular'>${user.popular}</div>
                    <span class="font-size-medium">Popular</span>
                </li>
                <button class='profile-btn'><a href='${user.profile}'>Profile</a></button>
            </ul>
        </div>
    </div>`;

    document
      .querySelector(".divResult")
      .insertAdjacentHTML("beforeend", html);
  };