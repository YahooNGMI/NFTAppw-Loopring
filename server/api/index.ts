import express from "express";
import fs from "fs"
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore, addDoc, getDoc, query, where, updateDoc } from "firebase/firestore";
import ToDo from "../domain/todo";
import cors from "cors"
import validateUserInput from "../validateUserInput";
import validateTaskInput from "../validateTaskInput";

// Import the functions you need from the SDKs you need

import { doc, setDoc } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";
import dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import


import User from "../domain/user";
import {
    UserAPI,
    generateKeyPair,
    ConnectorNames,
  
  
  } from "@loopring-web/loopring-sdk";
  import axios from "axios";
  import Web3 from "web3";

  enum NFTType {
    Ethereum,
    IMX, 
    Solana,
    Loopring,
    Cantos
}


type NFT = {
    imageURL: string;
    animationImage: string;
    name: string;
    description: string;
    collection:string;
    nftType: NFTType;
    index:number;
    creator:string;
    externalUrl:string;
    attributes: [{
        type: string,
        value: any
    }]
};


dotenv.config()

const app = express();
app.use(express.json())
app.use(cors());

let errorMessage;

const apiKey = process.env.FIREBASECONFIG_APIKEY
const authDomain = process.env.FIREBASECONFIG_AUTHDOMAIN
const projectId = process.env.FIREBASECONFIG_PROJECTID
const storageBucket = process.env.FIREBASECONFIG_STORAGEBUCKET
const messageSenderId = process.env.FIREBASECONFIG_MESSAGINGSENDERID
const appId = process.env.FIREBASECONFIG_APPID
const measurementId = process.env.FIREBASECONFIG_MEASUREMENTID
const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messageSenderId,
    appId,
    measurementId
}

//   // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig as any);


app.get("/loopring", async function (req, res) {
    // console.log("loopring")



    // res.send("loopring")
    async function fetchLoopringNfts(address: string): Promise<any> {
        let window;
        let domainNfts= [];
        const userAPI = new UserAPI({
            chainId: 1,
        });
       
        const accountInfo = await axios.get(
            `https://api3.loopring.io/api/v3/account?owner=${address}`
        );
        // console.log("accountinfo:", accountInfo);
        // console.log("owner:", accountInfo.data.owner);
        const NFTowner = accountInfo.data.owner;
        const web3: Web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/b5f32cd516e94d3395a90e5ed9c59400"));
     
        const eddsaKey = await generateKeyPair({
            isMobile: false,
            address: address,
            walletType: ConnectorNames.Gamestop,
            chainId: 1,
            keySeed:
                "Sign this message to access Loopring Exchange: 0x0BABA1Ad5bE3a5C0a66E7ac838a129Bf948f1eA4 with key nonce: 0",
            web3: web3,
        });


        const apiKey = await userAPI.getUserApiKey(
            {
                accountId: accountInfo.data.accountId,
            },
            eddsaKey.sk);


        const balances = await userAPI.getUserNFTBalances(
            {
                accountId: accountInfo.data.accountId,
                metadata: true,
            },
            apiKey.apiKey
        );


        let loopringCollectionName: string
        console.log("loopring", balances.userNFTBalances)




        // balances.userNFTBalances.forEach(async function (nft, index) {
        //     if (nft.collectionInfo) {
        //         loopringCollectionName = nft.collectionInfo.name
        //     } else {
        //         loopringCollectionName = ""
        //     }



        //     const domainNft: NFT = {
        //         name: nft.metadata.base.name,
        //         imageURL: parseImageURL(nft.metadata.base.image),
        //         animationImage: nft.metadata.uri,
        //         collection: loopringCollectionName,
        //         description: nft.metadata.base.description,
        //         nftType: NFTType.Loopring,
        //         index: index,
        //         creator: "",
        //         externalUrl: "",
        //         attributes: [{
        //             type: "",
        //             value: ""
        //         }],
        //     };
        //     domainNfts.push(domainNft);
        // })





        return accountInfo.data.owner;

    }

    fetchLoopringNfts("0x9552cfce60429863D4A7D8205457EC4AC05857dC").then((result)  => {
        console.log(result)
        res.send(result)
    })
})


// fetch user input from client, validate input, then reject/accept input 
app.post("/user/", async function (req, res) {
    // fetch
    const database = getFirestore(firebaseApp);
    const docRef = await getDocs(collection(database, "users"))
    var userList = docRef.docs.map(doc => doc.data())

    const username = req.body.username;
    const password = req.body.password;
    const isNewUser = req.body.isNewUser;

    // validate
    try {
        validateUserInput(userList as any, username, password, isNewUser)
    } catch (e) {
        errorMessage = e.message
        // console.log("message:", errorMessage)
        res.send({
            error: e.message
        })
        return;
    }

    //push newly created user to existing users and set active user on server side
    if (isNewUser === true) {
        //construct user


        //To-Do: Use UUID instead of seequential
        var userid = userList.length;
        const user: User = {
            userid: Number(userid),
            username: username,
            password: password
        }
        // let userList;
        if (userList === undefined) {
            userList = []
        } else {
            userList = userList
        }

        // userList.push(user);

        await setDoc(doc(database, "users", userid.toString()), {
            user
        });
        res.send(user)


    } else {
        const index = userList.findIndex(element => element.user.username === username)

        const user = {
            userid: index,
            username: username,
        }
        res.send(user)
    }

})

// Server-side code
app.get("/", async function (req, res) {

    // const userid = req.params.userid;
    const database = getFirestore(firebaseApp);
    const docRef = await getDocs(collection(database, "users", "9", "task"))
    const todoList = docRef.docs.map(doc => doc.data())


    res.send(docRef.docs.map(doc => doc.data()));
});

// Recieves userid, returns todos for user
app.get("/todo/:userid", async function (req, res) {
    const userid = req.params.userid;
    var assigned = req.body.assigned;
    const task = req.body.task;
    var completeBy = req.body.completeBy;
    const database = getFirestore(firebaseApp);
    const docRef = await getDoc(doc(database, "todo", userid))
    var todoList = docRef.data()
    console.log("old:", todoList)
    if (todoList === undefined) {
        todoList = []
    } else {
        todoList = todoList.todoList
    }

    res.send(todoList)
})
// Recieve tasks from client, validates it, then add to global list
app.post("/todo/:userid", async function (req, res) {
    const userid = req.params.userid;
    var assigned = req.body.assigned;
    const task = req.body.task;
    var completeBy = req.body.completeBy;

    try {
        validateTaskInput(assigned, task, completeBy, userid, todoList)
    } catch (e) {
        errorMessage = e.message

        res.send({
            error: e.message
        })
        return;
    }


    const newToDo: ToDo = {
        userid: Number(userid),
        assigned: assigned,
        task: task,
        completeBy: completeBy,
        done: false,
    }

    // Initialize Cloud Firestore and get a reference to the service
    const database = getFirestore(firebaseApp);
    const docRef = await getDoc(doc(database, "todo", userid))
    var todoList = docRef.data()


    if (todoList === undefined) {
        todoList = []
    } else {
        todoList = todoList.todoList
    }

    todoList.push(newToDo)

    await setDoc(doc(database, "todo", userid), {

        todoList
    })

    res.send(newToDo)
})

// recieve  task to be removed from client, removes from global todo list, and reorders global index
app.post("/removetodo/:globalTaskID/:userid", async function (req, res) {
    const globalTaskID = req.params.globalTaskID;
    const userid = req.params.userid
    const database = getFirestore(firebaseApp);


    const docRef = await getDoc(doc(database, "todo", userid))
    var todoList = docRef.data()


    if (todoList === undefined) {
        todoList = []
    } else {
        todoList = todoList.todoList
    }
    console.log("remove:", todoList[globalTaskID])

    todoList.splice(globalTaskID, 1)
    await setDoc(doc(database, "todo", userid), {

        todoList
    })

    res.send(todoList)
})
app.listen(3004)