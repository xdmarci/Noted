fetch('http://localhost:3000/updateuser', {
    method:'PUT',headers: new Headers(
        {"Content-Type": "application/json",
            "Accept": "application/json",
            "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjExMSwiaWF0IjoxNzM2NDMyODgyLCJleHAiOjE3MzY0NDAwODJ9.tS4ybKG2kNm89O4ZFfrHmTZR6xqVVWCSbgt16b_8dXI"}
    ),
    body:JSON.stringify({"Email":"akarmi@ize.hu"})
}).then(response => response.json())
  .then(data => console.log(data))

fetch('http://localhost:3000/getuser', {
    method:'GET',headers: new Headers(
        {"Content-Type": "application/json",
            "Accept": "application/json",
            "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjExMSwiaWF0IjoxNzM2NDMyODgyLCJleHAiOjE3MzY0NDAwODJ9.tS4ybKG2kNm89O4ZFfrHmTZR6xqVVWCSbgt16b_8dXI"}
    )
}).then(response => response.json())
  .then(data => console.log(data))


fetch('http://localhost:3000/Admupdateuser/111', {
    method:'PUT',headers: new Headers(
        {"Content-Type": "application/json",
            "Accept": "application/json",
            "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjgsImlhdCI6MTczNjExNjMxNCwiZXhwIjoxNzM2MTIzNTE0fQ.ywgYXes3hTwidVNehvFfw1Nwv_rlEdPurbBoe4rwwCQ"}
    ),
    body:JSON.stringify({"Email":"ujemail@ize.hu"})
}).then(response => response.json())
  .then(data => console.log(data))

//Blockolás
fetch('http://localhost:3000/Admupdateuser/111', {
    method:'PUT',headers: new Headers(
        {"Content-Type": "application/json",
            "Accept": "application/json",
            "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjgsImlhdCI6MTczNjQzMjYxMCwiZXhwIjoxNzM2NDM5ODEwfQ.2TrK2EYEShxkh_2QVBDg5fmyX4Bwf5IanMbGudWGnJs"}
    ),
    body:JSON.stringify({"statusz":0})
}).then(response => response.json())
  .then(data => console.log(data))


//törlés
  fetch('http://localhost:3000/Admdeleteuser/115', {
    method:'DELETE',headers: new Headers(
        {"Content-Type": "application/json",
            "Accept": "application/json",
            "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjgsImlhdCI6MTczNjQzMjYxMCwiZXhwIjoxNzM2NDM5ODEwfQ.2TrK2EYEShxkh_2QVBDg5fmyX4Bwf5IanMbGudWGnJs"}
    )
}).then(response => response.json())
  .then(data => console.log(data))

//getuser Admin
fetch('http://localhost:3000/Admgetuserbyid/111', {
    method:'GET',headers: new Headers(
        {"Content-Type": "application/json",
            "Accept": "application/json",
            "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjgsImlhdCI6MTczNjQzMjYxMCwiZXhwIjoxNzM2NDM5ODEwfQ.2TrK2EYEShxkh_2QVBDg5fmyX4Bwf5IanMbGudWGnJs"}
    )
}).then(response => response.json())
  .then(data => console.log(data))

fetch('http://localhost:3000/Admgetusers', {
    method:'GET',headers: new Headers(
        {"Content-Type": "application/json",
            "Accept": "application/json",
            "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjgsImlhdCI6MTczNjQzMjYxMCwiZXhwIjoxNzM2NDM5ODEwfQ.2TrK2EYEShxkh_2QVBDg5fmyX4Bwf5IanMbGudWGnJs"}
    )
}).then(response => response.json())
  .then(data => console.log(data))