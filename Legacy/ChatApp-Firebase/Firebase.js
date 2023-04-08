import firebase from 'firebase';

class Firebase
{
    constructor()
    {
      this.init(); //Method
      this.observeAuth(); //Method
    }

//Firebase Config 
init = () => {
    firebase.initializeApp({
        apiKey: "AIzaSyALZnvasq7k0l5GpcNCdr9jpcZujcfuEfU",
        authDomain: "react-native-bootcamp-2a81d.firebaseapp.com",
        databaseURL: "https://react-native-bootcamp-2a81d.firebaseio.com",
        projectId: "react-native-bootcamp-2a81d",
        storageBucket: "react-native-bootcamp-2a81d.appspot.com",
        messagingSenderId: "642693045643",
        appId: "1:642693045643:web:b1a1b7101f8d07929ca38e",
        measurementId: "G-EZ8KFKQTRC"
    })
}
    
observeAuth = () =>
{
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
}

    onAuthStateChanged = (user) =>
    {
        if (!user)
        {
            try
            { firebase.auth().signInAnonymously() }
            catch ({ message })
            { console.log(message) }
        }
    }

    get UID()
    {
        return (firebase.auth().currentUser || {}).uid
    }
    
    //getting a reference to firebase database
    get DatabaseRef()
    {
        return firebase.database().ref('message')
    }

    //getting timestamp from server for every message
    get timeStamp()
    {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    //Getting results and passing it to filter method
    on = callback =>
    {
        this.DatabaseRef
            .limitToLast(50)
        .on("child_added", snapshot => callback(this.parse(snapshot)))
    }

    //Customizing data with filtered results
    parse = snapshot =>
    {
        const { timeStamp: numberStamp, text, user } = snapshot.val();
        const timeStamp = new Date(numberStamp);
        const { key: _id } = snapshot;
        
        const message =
        {
            _id,
            timeStamp,
            text,
            user
        }
        return message;
    }
    

    send = (messages) =>
    {
        for (let i = 0; i < messages.length; i++)
        {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timeStamp: this.timeStamp
            };
            this.append(message);
        }
    };

    //Append method
    append = (message) => this.DatabaseRef.push(message);

    off()
    {
        this.DatabaseRef.off();
    }
    
}


Firebase.shared = new Firebase();
export default Firebase;