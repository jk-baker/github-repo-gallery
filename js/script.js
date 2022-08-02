//* Targeting the overview div where profile information will appear  *//
const overviewElement = document.querySelector(".overview");
const username = "jk-baker";

const getProfile = async function() {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const profile = await response.json();
  console.log(profile);
  displayUserInformation(profile);
}

getProfile();

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
}