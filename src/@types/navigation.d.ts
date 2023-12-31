import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  HomeScreenProps,
  PersonScreenProps,
  PublishScreenProps,
  TopicScreenProps,
  AccountScreenProps,
  SettingScreenProps,
} from "@src/views/BottomTabScreen";

type RootTabParamList = {
  Home: HomeScreenProps;
  Person: PersonScreenProps;
};

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Publish: PublishScreenProps;
  Topic: TopicScreenProps;
  Account: AccountScreenProps;
  Setting: SettingScreenProps;
};

type LoginTabParamList = {
  UserLogin: undefined;
  UserAdd: undefined;
  WordSelect: undefined;
};

type TabScreenList = keyof RootTabParamList;
type StackScreenList = keyof RootStackParamList;
type LoginTabScreenList = keyof LoginTabParamList;

export type TabScreenPropsGeneric<Screen extends TabScreenList> =
  BottomTabScreenProps<RootTabParamList, Screen>;

export type StackScreenPropsGeneric<Screen extends StackScreenList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type LoginTabScreenPropsGeneric<Screen extends LoginTabScreenList> =
  BottomTabScreenProps<LoginTabParamList, Screen>;
