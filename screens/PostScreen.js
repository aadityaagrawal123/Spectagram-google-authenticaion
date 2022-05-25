import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: "gray",
      speakerIcon: "volume-high-outline"
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  async initiateTTS(author, caption) {
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === "gray" ? "#ee8249" : "gray"
    });

    if (current_color === "gray") {
      Speech.speak(`Posted by ${author}`);
      Speech.speak("The caption of the post is!");
      Speech.speak(caption);
    } else {
      Speech.stop();
    }
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }
     else {
      return (
         <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Spectagram</Text>
            </View>
          </View>
          <View style = {styles.authorContainer} >
            <View style ={styles.authorImageContainer}>
              <Image source={require("../assets/profile_img.png")} style={styles.profileImage}></Image>
            </View>

            <View style={styles.authorNameContainer} >
              <Text style={styles.authorNameText}> {this.props.route.params.posts.author} </Text>
            </View>
         </View>

         <Image source={require("../assets/image_1.jpg")} style={styles.postImage}></Image>

              <View style={styles.dataContainer}>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      this.initiateTTS(
                        this.props.route.params.posts.author,
                        this.props.route.params.posts.caption,
                      )
                    }
                  >
                    <Ionicons
                      name={this.state.speakerIcon}
                      size={RFValue(30)}
                      color={this.state.speakerColor}
                      style={styles.ion}
                    />
                  </TouchableOpacity>
                </View>
              </View>

         <View style={styles.captionContainer} >
            <Text style={styles.captionText}>
              {this.props.route.params.posts.caption}
            </Text>
        </View>
        <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
               <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
               <Text style={styles.likeText}>12k</Text>
             </View>
        </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
     backgroundColor: "#2f345d",
  },
  postImage: {
    resizeMode: "contain",
    width: "98%",
    alignSelf: "center",
    height: RFValue(200)
  },
  authorContainer: {
    flex: 0.3,
    flexDirection: "row",
    marginLeft: RFValue(28),
    paddingTop: RFValue(10),
    paddingBottom: RFValue(10),
  },
   authorImageContainer: {
    flex: 0.15,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
   authorNameContainer: {
    flex: 1,
    justifyContent: "center"
  },
   authorNameText: {
    color: "white",
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans"
  },
  captionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(27),
    color: "white",
    paddingTop: RFValue(9),
    marginLeft: RFValue(5),
    alignSelf: "center"
  },
   captionContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
    dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: RFValue(75),
    alignSelf: "center",
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
    droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.206,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.2,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.8,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(29),
      fontFamily: "Bubblegum-Sans"
    },
    ion:{
      marginTop: RFValue(-1),
      marginBottom: RFValue(-20),
      marginLeft: RFValue(285),
    },
});
