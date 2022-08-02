//* Targeting the overview div where profile information will appear  *//
const overviewElement = document.querySelector(".overview");
const username = "jk-baker";
//* select the unordered list to display the repos list *//
const reposList = document.querySelector("ul");

//* Fetch a user profile from github *//
const getProfile = async function() {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const profile = await response.json();
  displayUserInformation(profile);
}

getProfile();

//* Display user information from profile passed to function *//
const displayUserInformation = function(profile) {
  let div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
  <figure>
    <img alt="user avatar" src=${profile.avatar_url} />
  </figure>  
  <div>
    <p><strong>Name:</strong> ${profile.name}</p>
    <p><strong>Bio:</strong> ${profile.bio}</p>
    <p><strong>Location:</strong> ${profile.location}</p>
    <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
    </div>
    `;
    
  overviewElement.append(div);
  gitRepos();
}

//* Fetch list of users public repos *//
const gitRepos = async function() {
  const repos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const data = await repos.json();
  console.log(data);
  displayRepoInformation(data);
}

//* Display info about user's repos passed to function *//
const displayRepoInformation = function(repos) {
  for (let repo of repos) {
    let li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    reposList.append(li);
  }
}
