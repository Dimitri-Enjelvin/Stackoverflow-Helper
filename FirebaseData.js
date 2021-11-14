export function NewAccount ({navigation}) {

    const [showDropDownGenders, setShowDropDownGenders] = useState(false);
    const [showDropDownAges, setShowDropDownAges] = useState(false);
    const [showDropDownCountries, setShowDropDownCountries] = useState(false);


    const [isSelectedSoft, setSelectionSoft] = useState(false)
    const [isSelectedHot, setSelectionHot] = useState(false)
    const [isSelectedSpicy, setSelectionSpicy] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pseudo, setPseudo] = useState("")
    const [age, setAge] = useState(null)
    const [gender, setGender] = useState()
    const [country, setCountry] = useState("")

    const GenderList = Genders 
    const CountryList = Countries
    const AgeList = Ages

    const HandleUniqueChange = () => {
        if(setSelectionSpicy || setSelectionHot) {
            setSelectionSoft(false)
        }
        if(setSelectionSpicy || setSelectionSoft) {
            setSelectionHot(false)
        }        
        if(setSelectionSoft || setSelectionHot) {
            setSelectionSpicy(false)
        }
    }

    const dbAuth = firebase.auth()
    const dbUsers = firebase.firestore().collection("users")
    const dbAgreggation = firebase.firestore().collection("agreggation")

    const onSignUp = () => {

        if(isSelectedSoft ===  true) {
            dbAuth
          .createUserWithEmailAndPassword(email, password)
          .then(res => {
              dbUsers
              .doc(dbAuth.currentUser.uid)
              .set({
                  email, 
                  pseudo,
                  mood: "soft",
                  gender,
                  age,
                  country
              })
          })
          .catch(error => {
            console.log(error);
          });
      };

      if(isSelectedHot ===  true) {
        dbAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
          dbUsers
          .doc(dbAuth.currentUser.uid)
          .set({
              email, 
              pseudo,
              mood: "hot",
              gender,
              age,
              country
          })
      })
      .catch(error => {
        console.log(error);
      });
    };

    if(isSelectedSpicy ===  true) {
        dbAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
          dbUsers
          .doc(dbAuth.currentUser.uid)
          .set({
              email, 
              pseudo,
              mood: "spicy",
              gender,
              age,
              country
          })
      })
      .catch(error => {
        console.log(error);
      });
    };

}

    // Here is what needs to be changed //

if (onSignUp) {
     dbAgreggation
          .doc('users')
          .set({
        id : dbUsers.doc(currentUser.uid),
        email: dbUsers.doc(currentUser.uid).email,
        pseudo: dbUsers.doc(currentUser.uid).pseudo,
        mood: dbUsers.doc(currentUser.uid).mood,
        age: dbUsers.doc(currentUser.uid).age,
        gender: dbUsers.doc(currentUser.uid).gender,
        country: dbUsers.doc(currentUser.uid).country
          })
}



    return (
    <Provider>
        <KeyboardAwareScrollView style={ styles.container }>
            <View style={ styles.topview }/>
            <View style={ styles.middleview }>
                <Text style={ styles.textmiddleview }>Créer un compte</Text>
                <View style={ styles.middlebar }/>
                    <View style={styles.checkboxContainer}>
                        <View style={styles.checkboxItem}>
                                <TouchableOpacity>
                                    <TouchableOpacity style={styles.moodBoxSoft} />
                                    <CheckBox
                                    value={isSelectedSoft}
                                    onChange={HandleUniqueChange}
                                    onValueChange={setSelectionSoft}
                                    style={styles.checkbox}
                                    >
                                    </CheckBox>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.checkboxItem}>
                                <TouchableOpacity>
                                    <TouchableOpacity style={styles.moodBoxHot} />
                                    <CheckBox
                                    value={isSelectedHot}
                                    onValueChange={setSelectionHot}
                                    onChange={HandleUniqueChange}
                                    style={styles.checkbox}
                                    >
                                    </CheckBox>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.checkboxItem}>
                                <TouchableOpacity>
                                    <TouchableOpacity style={styles.moodBoxSpicy} />
                                    <CheckBox
                                    value={isSelectedSpicy}
                                    onValueChange={setSelectionSpicy}
                                    onChange={HandleUniqueChange}
                                    style={styles.checkbox}
                                    >
                                    </CheckBox>
                                </TouchableOpacity>
                            </View>
                        </View>
                    <View style={ styles.textInputContainer }>
                        <TextInput
                        mode="outlined"
                        value={email}
                        validate={ hasValid }
                        label="Email"
                        placeholder="Email"
                        onChangeText= {(email) => setEmail(email)}
                        autoCorrect={false}
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        enablesReturnKeyAutomatically={true}
                        blurOnSubmit={false}
                        onSubmitEditing={() => this.password.focus()}
                        />
                        <TextInput
                        mode="outlined"
                        value={pseudo}
                        label="Pseudo"
                        placeholder="Pseudo"
                        onChangeText= {(pseudo) => setPseudo(pseudo)}
                        />
                        <TextInput
                        mode="outlined"
                        value={password}
                        label="Mot de passe"
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        onChangeText= {(password) => setPassword(password)}
                        textContentType="password"
                        enablesReturnKeyAutomatically={true}
                        returnKeyType="done"
                        />  
                    </View>                  
                        <View style={styles.dropdownContainer}>
                        <SafeAreaView style={styles.dropdownGender}>
                            <DropDown
                            label={"Gender"}
                            mode={"outlined"}
                            value={gender}
                            setValue={setGender}
                            list={GenderList}
                            visible={showDropDownGenders}
                            showDropDown={() => setShowDropDownGenders(true)}
                            onDismiss={() => setShowDropDownGenders(false)}
                            inputProps={{
                                right: <TextInput.Icon name={"menu-down"} />,
                            }}
                            />
                        </SafeAreaView>
                        <SafeAreaView style={styles.dropdownAge}>
                            <DropDown
                            label={"Age"}
                            mode={"outlined"}
                            value={age}
                            setValue={setAge}
                            list={AgeList}
                            visible={showDropDownAges}
                            showDropDown={() => setShowDropDownAges(true)}
                            onDismiss={() => setShowDropDownAges(false)}
                            inputProps={{
                                right: <TextInput.Icon name={"menu-down"} />,
                            }}
                            />
                        </SafeAreaView>
                        <SafeAreaView style={styles.dropdownCountry}>
                            <DropDown
                            label={"Country"}
                            mode={"outlined"}
                            value={country}
                            setValue={setCountry}
                            list={CountryList}
                            visible={showDropDownCountries}
                            showDropDown={() => setShowDropDownCountries(true)}
                            onDismiss={() => setShowDropDownCountries(false)}
                            inputProps={{
                                right: <TextInput.Icon name={"menu-down"} />,
                            }}
                            />
                        </SafeAreaView>    
                        </View>
                        <Button 
                       onPress={onSignUp}
                       title="Créer un compte"
                        >
                        Créer un compte
                        </Button>
            </View>
        </KeyboardAwareScrollView>
    </Provider>
)}

export default NewAccount