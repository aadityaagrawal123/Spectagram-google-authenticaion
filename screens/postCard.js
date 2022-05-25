import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
         <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("PostScreen", {
              posts: this.props.posts
            })
          }
        >
          <View style={styles.cardContainer}>
         <View style = {styles.authorContainer} >
            <View style ={styles.authorImageContainer}>
              <Image source={require("../assets/profile_img.png")} style={styles.profileImage}></Image>
            </View>

            <View style={styles.authorNameContainer} >
              <Text style={styles.authorNameText}> {this.props.posts.author} </Text>
            </View>
         </View>

         <Image source={require("../assets/image_1.jpg")} style={styles.postImage}></Image>

         <View style={styles.captionContainer} >
            <Text style={styles.captionText}>
              {this.props.posts.caption}
            </Text>
            <Text style={styles.tags}>{this.props.posts.tags}</Text>
         </View>

        <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
               <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
               <Text style={styles.likeText}>12k</Text>
             </View>
        </View>

        </View>
      </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  postImage: {
    resizeMode: "contain",
    width: "98%",
    alignSelf: "center",
    height: RFValue(200)
  },
  authorContainer: {
    flex: 1,
    flexDirection: "row"
  },
   authorImageContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
   authorNameContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
   authorNameText: {
    color: "white",
    fontSize: RFValue(20),
    fontFamily: "Bubblegum-Sans"
  },
  captionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(23),
    color: "white",
    paddingTop: RFValue(10)
  },
  tags:{
    color: "blue",
    fontWeight: 'bold',
  },
   captionContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
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
  }
});