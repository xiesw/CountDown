//
//  RNAppUtil.m
//  CountDown
//
//  Created by pain.xie on 2018/3/22.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RNAppUtil.h"
#import "AppDelegate.h"
#import <AdSupport/ASIdentifierManager.h>

@implementation RNAppUtil

NSString * const CHANNEL = @"AppStore";

NSString * const BRAND = @"iphone";

NSString * const APP_ID = @"979116729";

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(getAppInfo,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
  NSString *version = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
  
  NSString *appName = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleDisplayName"];
  
  NSString *idfa = [[[ASIdentifierManager sharedManager] advertisingIdentifier] UUIDString];
  
  resolve(@[@{@"appName":appName, @"version":version, @"deviceId": idfa, @"channel":CHANNEL,@"brand":BRAND}]);
}

@end
