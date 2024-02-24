import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, SafeAreaView, Dimensions, Image, View, Platform, StatusBar, Alert } from 'react-native';
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NaverLogin, { NaverLoginResponse, GetProfileResponse } from '@react-native-seoul/naver-login';

export default function Main({navigation} : any) {
    const [result , setResult] = useState('');


    useEffect(() => {

        // const googleConfigure = async() => {
        //     await GoogleSignin.configure({
        //         webClientId : '340780793926-c80cndr8lsl9iduc0qhucpk7rl7hbh5v.apps.googleusercontent.com'
        //     })
        // }

        // googleConfigure()
    })
    
    const signInWithKakao = async (): Promise<void> => {
        try {
            const token: KakaoOAuthToken = await login();
            const userInfo = await KakaoLogin.getProfile();
            const userAccessToken = await KakaoLogin.getAccessToken();
            const userEmail = userInfo.email;
            const userAge = userInfo.ageRange;
            const userProfileImg = userInfo.profileImageUrl;
            const userGender = userInfo.gender;
            const userNickNmae = userInfo.nickname;
            console.log('userEmail : ' + userEmail);
            console.log('userAge : ' + userAge);
            console.log('userProfileImg' + userProfileImg);
            console.log('userGender' + userGender);
            console.log('userNickNmae' + userNickNmae);
            console.log('userAccessToken' + userAccessToken);

            if (userAccessToken) {
                navigation.navigate("Tabs");
            } else {
                Alert.alert('ERROR', '알 수 없는 이유로 로그인에 실패하였습니다.', [
                    {text: 'OK'},
                ]);
            }
        } catch (error) {
            Alert.alert('ERROR', '알 수 없는 이유로 로그인에 실패하였습니다.', [
                {text: 'OK'},
            ]);
        }
    }

    const androidKeys = {
        consumerKey: "RXWXkXCQzKJEQMy5rEdW",
        consumerSecret: "omkincgN1v",
        appName: "com.awesomeproject"
    };
      
    const naverSignIn = async(props:any):Promise<void> => {
        try{
            const {failureResponse, successResponse} = await NaverLogin.login(props);
            const token = successResponse;
            const userAccessToken = token!.accessToken;
            const userInfo = await NaverLogin.getProfile(userAccessToken);
            const userEmail = userInfo.response.email;
            const userAge = userInfo.response.birthyear;
            const userProfileImg = userInfo.response.profile_image;
            const userGender = userInfo.response.gender;
            const userNickNmae = userInfo.response.nickname;

            if (userAccessToken) {
                navigation.navigate("Tabs");
            }

            setResult(JSON.stringify(token));
        } catch (error) {
            console.error(error);
        }
    }

    // const onGoogleButtonPress = async () => {
    //     const { idToken } = await GoogleSignin.signIn();
    //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    //     return auth().signInWithCredential(googleCredential);
    // }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <Image source={require('../../assets/loginTopImg.png')} style={styles.loginTopImg}/>
            <Image source={require('../../assets/loginMiddleImg.png')} style={styles.loginMiddleImg}/>
            <Image source={require('../../assets/backImg.png')} style={styles.backgroundImg}/>
            <View style={styles.btnStack}>
                <TouchableOpacity onPress={signInWithKakao} style={styles.kakaoLoginBtn}>
                    <View style={styles.loginView}>
                        <Image source={require('../../assets/KakaoImg.png')} />
                        <Text style={styles.text}>카카오로 로그인</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>naverSignIn(androidKeys)} style={styles.naverLoginBtn}>
                    <View style={styles.loginView}>
                        <Image source={require('../../assets/NaverImg.png')} />
                        <Text style={styles.text}>네이버로  로그인</Text>
                    </View>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={googleSignIn} style={styles.googleLoginBtn}>
                    <View style={styles.loginView}>
                        <Image source={require('../../assets/GoogleImg.png')} />
                        <Text style={styles.text}>구글로  로그인</Text>
                    </View> 
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => navigation.navigate("Tabs")} style={styles.moveHomeBtn}>
                    <View style={styles.loginView}>
                        <Text style={styles.text}>홈 화면으로 이동</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
    
};

const FIGMA_WIDTH = 360
const FIGMA_HEIGHT = 760
const StatusBarHeight = getStatusBarHeight(true)

const marginTop = (value : any) => {
    const data = (( Dimensions.get('screen').height / FIGMA_HEIGHT) * value) + StatusBarHeight
    return data
}

const width = (value : any) => {
    const data = (( Dimensions.get('screen').width / FIGMA_WIDTH) * value)
    console.log(Dimensions.get('screen').width + '/' + Dimensions.get('screen').height)
    return data
}

const height = (value : any) => {
    const data = (( Dimensions.get('screen').height / FIGMA_HEIGHT) * value)
    return data
}


const styles = StyleSheet.create({
    SafeAreaView : {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor : 'white'
    },
    loginTopImg : {
        position : 'absolute',
        top :  marginTop(93),
        left : 21
    },
    loginMiddleImg : {
        position : 'absolute',
        top : marginTop(198),
        right : 21
    },
    backgroundImg : {
        position : 'absolute',
        width : width(400.74),
        height : height(453.49),
        bottom : 0,
        left : -57,
    },
    btnStack : {
        position : 'absolute',
        // top : 414,
        bottom : 180
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft : 10
    },
    loginView : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    kakaoLoginBtn : {
        width : Dimensions.get("window").width - 30,
        height : 44,
        textAlign: 'center',
        backgroundColor : '#FFDB00',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius : 10
    },
    naverLoginBtn : {
        width : Dimensions.get("window").width - 30,
        height : 44,
        textAlign: 'center',
        backgroundColor : '#03C75A',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 10,
        borderRadius : 10
    },
    googleLoginBtn : {
        width : Dimensions.get("window").width - 30,
        height : 44,
        textAlign: 'center',
        backgroundColor : '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : 10,
        borderRadius : 10,
    },
    moveHomeBtn : {
        width : Dimensions.get("window").width - 30,
        height : 44,
        textAlign: 'center',
        backgroundColor : 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius : 10,
        marginTop : 10
    },
    moveHomeText : {
        fontSize: 20,
        fontWeight: 'bold',
        color : 'white',
        marginTop : 10
    }

    
});
