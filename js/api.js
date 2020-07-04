const base_url = "https://api.football-data.org/v2/";
const api_key = "a17c58ed43524bb7b0ab18940702b153";
const liga_id = 2021;

const standings = `${base_url}competitions/${liga_id}/standings`;
const matches = `${base_url}competitions/${liga_id}/matches`;
const teams = `${base_url}competitions/${liga_id}/teams`;

function status(response) {
    if (response.status !== 200) {
        console.log("Error :" + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error :" + error);
}

function getStandings() {
    fetch(standings,{headers : {'X-Auth-Token' : api_key}})
        .then(status)
        .then(json)
        .then(function(data) {
            console.log(data.standings[0].table);
            let standingsHTML = "";
            data.standings[0].table.forEach(function(standing){
                standingsHTML += `
                            <tr>
                                <td class="center">${standing.position}</td>
                                <td>${standing.team.name}</td>
                                <td>${standing.points}</td>
                                <td>${standing.won}</td>
                                <td>${standing.draw}</td>
                                <td>${standing.lost}</td>
                                <td>${standing.goalsFor}</td>
                            </tr>`;
            });
            document.getElementById("standing").innerHTML = standingsHTML;
        })
        .catch(error);
}


function getMatches() {
    fetch(matches,{headers : {'X-Auth-Token' : api_key}})
        .then(status)
        .then(json)
        .then(function(data) {
            console.log(data.matches);
            let matchesHTML = "";
            data.matches.forEach(function(match){
                matchesHTML += `
                    <div class="card">
                    <div class="card-content">
                    <div class="row">
                        <div class="col s4 right-align">${match.homeTeam.name}</div>
                        <div class="col s1">${match.score.fullTime.homeTeam}</div>
                        <div class="col s1">VS</div>
                        <div class="col s1">${match.score.fullTime.awayTeam}</div>
                        <div class="col s4 left-align">${match.awayTeam.name}</div>
                        <div class="col s1">
                            <a href="./matchdetail.html?id=${match.id}"><span class="new badge waves-effect waves-light" id="save">Detail</span></a>
                        </div>
                    </div>
                    </div>
                    </div>`
            });
            document.getElementById("match").innerHTML = matchesHTML;
        })
        .catch(error);
}

function getMatchDetail() {
    return new Promise(function(resolve, reject) {
            
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        fetch(base_url + "matches/" + idParam, {headers : {'X-Auth-Token' : api_key}})
        .then(status)
        .then(json)
        .then(function (data) {
            console.log(data);
            let detailMatchHTML = `
                <div class="row">
                    <div class="card">
                    <div class="card-content">
                        <div class="row center-align">
                            <h3>Match Detail</h3>
                        </div>
                        <div class="row">
                            <div class="col s4 right-align"><h5>${data.match.homeTeam.name}</h5></div>
                            <div class="col s1 right-align"><h5>${data.match.score.fullTime.homeTeam}</h5></div>
                            <div class="col s2 center-align"><h5>VS</div></h5>
                            <div class="col s1 left-align"><h5>${data.match.score.fullTime.awayTeam}</h5></div>
                            <div class="col s4 left-align"><h5>${data.match.awayTeam.name}</h5></div>
                        </div>
                        <div class="row center-align">
                            Match day: ${data.match.matchday}
                        </div>
                        <div class="row center-align">
                            Date : ${data.match.utcDate}
                        </div>
                        <div class="row center-align">
                            Venue : ${data.match.venue}
                        </div>
                    </div>
                    </div>
                </div>
                <div class="row">
                    <div class="card">
                    <div class="card-content">
                        <div class="row center-align">
                            <h3>Head to Head</h3>
                        </div>
                        <div class="row center-align">
                            Number of Match : ${data.head2head.numberOfMatches}
                        </div>
                        <div class="row center-align">
                            Total goals : ${data.head2head.totalGoals}
                        </div>
                        <div class="row">
                            <table class="centered">
                                <thead>
                                <tr>
                                    <th>${data.head2head.homeTeam.name}</th>
                                    <th></th>
                                    <th>${data.head2head.awayTeam.name}</th>
                                </tr>
                                </thead>
                        
                                <tbody>
                                <tr>
                                    <td>${data.head2head.homeTeam.wins}</td>
                                    <td>WINS</td>
                                    <td>${data.head2head.awayTeam.wins}</td>
                                </tr>
                                <tr>
                                    <td>${data.head2head.homeTeam.draws}</td>
                                    <td>DRAWS</td>
                                    <td>${data.head2head.awayTeam.draws}</td>
                                </tr>
                                <tr>
                                    <td>${data.head2head.homeTeam.losses}</td>
                                    <td>LOSSES</td>
                                    <td>${data.head2head.awayTeam.losses}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>`;
            document.getElementById("body-content").innerHTML = detailMatchHTML;
            resolve(data);
        });
    })
}

function getTeams() {
    fetch(teams,{headers : {'X-Auth-Token' : api_key}})
        .then(status)
        .then(json)
        .then(function(data) {
            console.log(data.teams);
            let teamsHTML = "";
            data.teams.forEach(function(team){

                teamsHTML += `
                    <div class="row card">
                    <div class="card-content">
                        <div class="col s3">
                            <img alt="${team.name} logo" class="responsive-img" src="${team.crestUrl}">
                        </div>
                        <div class="col s8">
                            <table>
                                <tr>
                                    <td>Name:</td>
                                    <td>${team.name}</td>
                                </tr>
                                <tr>
                                    <td>Venue:</td>
                                    <td>${team.venue}</td>
                                </tr>
                                <tr>
                                    <td>Website:</td>
                                    <td>${team.website}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col s1">
                            <a href="./teamdetail.html?id=${team.id}" class="btn-floating waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>
                        </div>
                    </div>
                </div>`;
            });
            document.getElementById("team").innerHTML = teamsHTML;
        })
        .catch(error);
}

function getTeamDetail() {
    return new Promise(function(resolve, reject) {
            
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        fetch(base_url + "teams/" + idParam, {headers : {'X-Auth-Token' : api_key}})
        .then(status)
        .then(json)
        .then(function (data) {
            console.log(data);
            
            let detailTeamHTML = `
                <div class="row">
                    <div class="card center-align">
                    <h2 class="card-content">${data.name}</h2>
                </div>
                <div class="card center-align">
                    <img src="${data.crestUrl}" class="responsive-img">
                </div>
                <div class="card">
                    <div class="card-content">
                        <h4 class="center-align">Club Details</h4>
                        <table class="striped">
                            <tr>
                                <td>Name</td>
                                <td>${data.name}</td>
                            </tr>
                            <tr>
                                <td>Short Name</td>
                                <td>${data.shortName}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>${data.address}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>${data.phone}</td>
                            </tr>
                            <tr>
                                <td>Website</td>
                                <td>${data.website}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>${data.email}</td>
                            </tr>
                            <tr>
                                <td>Founded</td>
                                <td>${data.founded}</td>
                            </tr>
                            <tr>
                                <td>Club Colors</td>
                                <td>${data.clubColors}</td>
                            </tr>
                            <tr>
                                <td>Venue</td>
                                <td>${data.venue}</td>
                            </tr>
                        </table>
                    </div>
                </div>`;
            document.getElementById("body-content").innerHTML = detailTeamHTML;
            resolve(data);
        });
    })
}

function getSavedTeams() {
    getAll().then(function(teams) {
        console.log(teams);

        let savedTeamsHTML = "";
        teams.forEach(function(team) {
            savedTeamsHTML += `
                <div class="row card">
                    <div class="card-content">
                        <div class="col s3">
                            <img alt="${team.name} logo" class="responsive-img" src="${team.crestUrl}">
                        </div>
                        <div class="col s8">
                            <table>
                                <tr>
                                    <td>Name:</td>
                                    <td>${team.name}</td>
                                </tr>
                                <tr>
                                    <td>Venue:</td>
                                    <td>${team.venue}</td>
                                </tr>
                                <tr>
                                    <td>Website:</td>
                                    <td>${team.website}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="col s1">
                            <a href="./teamdetail.html?id=${team.id}&saved=true" class="btn-floating waves-effect waves-light red"><i class="material-icons">arrow_forward</i></a>
                        </div>
                    </div>
                </div>`;
        })
        document.getElementById("body-content").innerHTML = savedTeamsHTML;
    })
}

function getSavedTeamById() {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    
    getTeamById(idParam).then(function(team) {
      console.log(team);
      let teamByIdHTML = `
      <div class="row">
                <div class="card center-align">
                    <h2 class="card-content">${team.name}</h2>
                </div>
                <div class="card center-align">
                    <img src="${team.crestUrl}" class="responsive-img">
                </div>
                <div class="card">
                    <div class="card-content">
                        <h4 class="center-align">Club Details</h4>
                        <table class="striped">
                            <tr>
                                <td>Name</td>
                                <td>${team.name}</td>
                            </tr>
                            <tr>
                                <td>Short Name</td>
                                <td>${team.shortName}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>${team.address}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>${team.phone}</td>
                            </tr>
                            <tr>
                                <td>Website</td>
                                <td>${team.website}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>${team.email}</td>
                            </tr>
                            <tr>
                                <td>Founded</td>
                                <td>${team.founded}</td>
                            </tr>
                            <tr>
                                <td>Club Colors</td>
                                <td>${team.clubColors}</td>
                            </tr>
                            <tr>
                                <td>Venue</td>
                                <td>${team.venue}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>`;
        document.getElementById("body-content").innerHTML = teamByIdHTML;
    });
  }