// const number = [1,2,3,4,5,6];
// const test = number.map(num=> num +3);

// console.log(test);

// in this case we iterate in the number array and create a new one 
// contaiens the result of the callback function (num)



// we can use map method to exteract the data 

// const user__ =[
//     {
//         id:1,
//         name:"bayoume"
//     },
//     {
//         id:19,
//         name:"nader"
//     },
//     {
//         id:13,
//         name:"beeba"
//     },
// ];

// const username = users.map(user =>user.name);

// console.log(username);

// // so the syntax is 

// // Array.map(element =>(curentValue,index,Array), thisArg)

// console.log('this is me ');


const users = [
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      address: "123 Main St, New York, NY",
      phone: "123-456-7890",
      roleId: 2
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      address: "456 Oak St, Los Angeles, CA",
      phone: "987-654-3210",
      roleId: 1
    },
    {
      id: 3,
      name: "Charlie",
      email: "charlie@example.com",
      address: "789 Pine St, Chicago, IL",
      phone: "555-555-5555",
      roleId: 3
    },
    {
      id: 36,
      name: "nourhan",
      email: "nour@example.com",
      address: "789 Pine St, Chicago, IL",
      phone: "555-555-5555",
      roleId: 6565
    }
  ];
  
  const roles = [
    { id: 1, roleName: "Admin" },
    { id: 2, roleName: "Editor" },
    { id: 3, roleName: "Viewer" }
  ];


  const user_with_role = users.map (user =>{
    const roleName = roles.find(role => role.id === user.roleId);

    return {...user,
      roleName:roleName ? roleName.roleName: "unknown user role"
    }
  });
  

  // console.log(user_with_role);








  // console.log(users);

  // const user_with_role = users.map(user=>{
  //   const role = roles.find(role=> role.id = user.roleId);
  //   return {...users,}
  // });

  // console.log(user_with_role);
  
  // const r_names = roles.map(role => role.roleName);
  // console.log(r_names);
  
  // const new_dataSet = users.map(prop => ({
  //     ...prop, 
  //     mod_role_name: r_names
  // }));
  
  // console.log(new_dataSet);
  
  // const dataSet = users.map(user=>{
  //   const finder = roles.find(role=> rol.id === users.id);
  //   // return {...users,userRoleName:finder}
  //   console.log(role)
  // })
  // console.log(dataSet);



//   // sort() method 

//   const names = ["mohamed","ahemd","bayoume"];

//   console.log(names.sort());
//   // this method works fine for the strings 

// // for the numbers we need to add the comparison function 
// const numbers = [0,89,1,2,454,24,8,];
// let sorted = numbers.sort((a,b) => a-b);
// console.log(sorted)
// //////////////////////////////////////////



// // the index of() method 
// const checker = roles.map(role =>role.roleName)
// console.log(checker.includes("Admin"))
// ////////////////////////////////////////////////////////
// loop through array using foreach method 


// user_with_role.forEach(userItem=>{
  
// console.log( userItem + "role")
// })

// console.log(user_with_role.forEach((item,index)=>{
//   console.log(item.name)
// })
// )

const names = ["Tom", "Jessica", "Quincy", "Naomi","mohamed","tamer","ahmed"];
names.sort(() => Math.random() - 0.5);
console.log(names)
