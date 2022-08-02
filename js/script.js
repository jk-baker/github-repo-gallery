//* Targeting the overview div where profile information will appear  *//
const overviewElement = document.querySelector(".overview");
const username = "jk-baker";
//* select the unordered list to display the repos list *//
const reposList = document.querySelector("ul");
//* Select section where all the repos information appears *//
const reposSection = document.querySelector(".repos");
//* Select section where individual repo data will appear *//
const repoData = document.querySelector(".repo-data");
//* Select the back to repo gallery button *//
const backButton = document.querySelector("button");
//* Select the input for search *//
const filterInput = document.querySelector("input");


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
  filterInput.classList.remove("hide");
  for (let repo of repos) {
    let li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    reposList.append(li);
  }
}

//* Event listener to listen for click on the individual repos *//
reposList.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    let repoName = e.target.innerText;
    gitRepoInformation(repoName);
  }
})

/** get specific repo information */
const gitRepoInformation = async function(repoName) {
  const gitRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await gitRepoInfo.json();
  //console.log(repoInfo);
  const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
  const languageData = await fetchLanguages.json();
  //console.log(languageData);
  const languages = [];
  for (let key in languageData) {
    languages.push(key);
  }
  console.log(languages);
  displaySpecificRepoInformation(repoInfo, languages);
}

//* desplay specific repo information *//
const displaySpecificRepoInformation = function(repoInfo, languages) {
  repoData.innerHTML = "";
  let div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `
  repoData.append(div);
  repoData.classList.remove("hide");
  reposSection.classList.add("hide");
  backButton.classList.remove("hide");
}

//* return to full list when back button clicked *//
backButton.addEventListener("click", function() {
  reposSection.classList.remove("hide");
  repoData.classList.add("hide");
  backButton.classList.add("hide");
})

//* dynamicly update list as search text is entered
filterInput.addEventListener("input", function(e) {
  const searchValue = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const searchValueLower = searchValue.toLowerCase();
  for (let repo of repos) {
    let repoLower = repo.innerText.toLowerCase();
    if (repoLower.includes(searchValueLower)) {
      repo.classList.remove("hide");
    }
    else {
      repo.classList.add("hide");
    }
  }
})