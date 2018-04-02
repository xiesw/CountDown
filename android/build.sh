/usr/bin/python build.py
cd .. && npm install
react-native bundle --platform android --dev false --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res/
cd android && ./gradlew assembleRelease
cd ../output && java -jar walle-cli-all.jar batch -f channel.txt  countdown.apk