import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { StackScreenPropsGeneric } from "@src/@types/navigation";
import HeaderBarWrapper from "@src/components/HeaderBarWrapper";
import { NavBar } from "@src/components/NavBar";
import { OptionItem } from "@src/components/OptionItem";
import { PersonCard } from "@src/components/PersonCard";
import { UserInfoPOJO, UserStatistics } from "@src/models/User";
import { getUserInfo, getUserStatistics } from "@src/services/forum";
import { useQuery } from "@tanstack/react-query";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useUser from "@src/hooks/useUser";
import { useEffect } from "react";

export const PersonView: React.FC = () => {
  const navigation =
    useNavigation<StackScreenPropsGeneric<"Main">["navigation"]>();
  const user = useUser();
  const focus = useIsFocused();

  interface UserResponseObject {
    userInfo: UserInfoPOJO;
    userStatistics: UserStatistics;
  }
  const userRequest = async (wallet: string) => {
    return {
      userInfo: await getUserInfo(wallet),
      userStatistics: await getUserStatistics(user.profile.wallet),
    };
  };

  const normalRequest = async () => {
    return await userRequest(user.profile.wallet);
  };

  const {
    isSuccess,
    isLoading,
    isError,
    data: userReturnData,
    refetch: refetchUser,
  } = useQuery<UserResponseObject>({
    queryKey: ["userInfo", "userStatistics", user.profile.wallet],
    queryFn: normalRequest,
  });

  const PersonErrorView = () => {
    return (
      <View style={PersonViewStyle.whole}>
        <View style={PersonViewStyle.header}>
          <HeaderBarWrapper alignMethod="lc">
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Text style={{ color: "blue", fontSize: 16 }}>返回登陆页面</Text>
            </TouchableOpacity>
            <Text style={PersonViewStyle.pageTitle}>个人</Text>
          </HeaderBarWrapper>
        </View>
        <View style={PersonViewStyle.errorContent}>
          <Pressable
            onPress={() => {
              refetchUser();
            }}
            style={{ alignItems: "center" }}
          >
            <Icon
              name="closecircle"
              type="antdesign"
              color={"red"}
              size={50}
            ></Icon>
            <Text style={PersonViewStyle.errorText}>
              Fail to fetch the Content!
            </Text>
            <Text style={PersonViewStyle.errorText}>
              Press to refresh this page!
            </Text>
          </Pressable>
        </View>
        <NavBar />
      </View>
    );
  };
  let personCard, settingList;

  useEffect(() => {
    refetchUser();
  }, [focus]);

  if (isError) {
    return <PersonErrorView />;
  }
  if (isLoading) {
    personCard = <PersonCard userInfo={{} as UserInfoPOJO} isLoading={true} />;
    settingList = <></>;
  }
  if (isSuccess) {
    personCard = <PersonCard {...userReturnData} isLoading={false} />;
    settingList = (
      <View>
        {/* <TouchableOpacity onPress={() => console.log("HI")}>
          <OptionItem
            title="发帖"
            icon={<Icon type="antdesign" name="copy1" />}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() => {
            navigation.push("Statistics", {
              userStatistics: userReturnData.userStatistics,
            });
          }}
        >
          <OptionItem
            title="统计"
            icon={<Icon type="antdesign" name="linechart" />}
          />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => console.log("HI")}>
          <OptionItem
            title="荣誉"
            icon={<Icon type="antdesign" name="Trophy" />}
          />
        </TouchableOpacity> */}

        <View style={{ height: 10 }} />
        {/* <TouchableOpacity onPress={() => navigation.push("Setting")}>
          <OptionItem
            title="设置"
            icon={<Icon type="antdesign" name="setting" />}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={() =>
            navigation.push("Account", {
              wallet: user.profile.wallet,
              userName: userReturnData.userInfo.username,
              userSignature: userReturnData.userInfo.signature,
              userAvatar: userReturnData.userInfo.avatar,
            })
          }
        >
          <OptionItem title="账户" icon={<Icon type="feather" name="user" />} />
        </TouchableOpacity>

        <View style={{ height: 10 }} />
        <TouchableOpacity onPress={() => navigation.push("ProductionInfo")}>
          <OptionItem
            title="产品信息"
            icon={<Icon type="antdesign" name="earth" />}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={PersonViewStyle.whole}>
      <View style={PersonViewStyle.header}>
        <HeaderBarWrapper alignMethod="c">
          <Text style={PersonViewStyle.pageTitle}>{`个人`}</Text>
        </HeaderBarWrapper>
      </View>

      <View style={PersonViewStyle.content}>
        <ScrollView>
          {personCard}
          <View style={{ height: 10 }} />
          {settingList}
        </ScrollView>
      </View>
      <NavBar />
    </View>
  );
};

const PersonViewStyle = StyleSheet.create({
  header: { backgroundColor: "rgb(230,230,230)" },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  whole: {
    flex: 1,
  },
  errorText: {
    justifyContent: "center",
    paddingTop: 18,
    fontSize: 18,
  },
  errorContent: {
    backgroundColor: "rgb(240,240,240)",
    flex: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PersonView;
