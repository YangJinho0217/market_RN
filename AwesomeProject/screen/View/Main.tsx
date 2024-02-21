import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, SafeAreaView, Dimensions, Image, View, Platform, StatusBar, Alert } from 'react-native';
import  * as KakaoLogin from '@react-native-seoul/kakao-login';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function Main({navigation} : any) {
    
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

    // const login = () => {
    //     KakaoLogin.login().then((result) => {
    //         console.log("Login Success", JSON.stringify(result));
    //         // getProfile();
    //     }).catch((error) => {
    //         if (error.code === 'E_CANCELLED_OPERATION') {
    //             console.log("Login Cancel", error.message);
    //         } else {
    //             console.log(`Login Fail(code:${error.code})`, error.message);
    //         }
    //     });
    // };

    const naverSignIn = () => {

    }

    const googleSignIn = () => {

    }

    useEffect(() => {
    }, []);

    
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
                <TouchableOpacity onPress={naverSignIn} style={styles.naverLoginBtn}>
                    <View style={styles.loginView}> 
                        <Image source={require('../../assets/NaverImg.png')} />
                        <Text style={styles.text}>네이버로  로그인</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={googleSignIn} style={styles.googleLoginBtn}>
                    <View style={styles.loginView}> 
                        <Image source={require('../../assets/GoogleImg.png')} />
                        <Text style={styles.text}>구글로  로그인</Text>
                    </View>
                </TouchableOpacity>
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
