import { fireEvent, render, screen } from "@testing-library/react-native";
import { TopicView } from "../TopicView";
import { User, UserInfoPOJO } from "@src/models/User";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Response, Server } from "miragejs";
import { startForumServer } from "@src/services/__test__/mirage";
import { HomeView } from "../HomeView";
import APIConfig from "@src/services/api.config";

const mockUserTestData: UserInfoPOJO = {
  username: "Test",
  wallet: "Test",
  avatar: "Test",
  signature: "Test",
  muted: false,
  banned: false,
  balance: 1,
  credibility: 1,
  privilege: 1,
  activeRole: "Test",
  rolesAssigned: ["Test"],
  activeBadge: { name: "Test", cid: "Test" },
  badgesReceived: [{ name: "Test", cid: "Test" }],
  createdAt: new Date(),
  updateAt: new Date(),
};

const mockedNavigate = jest.fn();
const mockpush = jest.fn();
const mockPop = jest.fn();
const mockUseRoute = jest.fn();
const mockUseIsFocus = jest.fn();
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
      push: mockpush,
      pop: mockPop,
    }),
    useRoute: () => ({
      name: "Person",
    }),
    useIsFocused: () => true,
  };
});

const mockUser = User;

jest.mock("@src/hooks/useUser", () => ({
  __esModule: true,
  useSetUser: () => {
    return () => ({});
  },
  default: () => new mockUser("", "", mockUserTestData),
}));

interface ForumTopic {
  id: number;
  hash: string;
  title: string;
  creator: SimpleUser;
  avatar: string;
  content: string;
  categoryAssigned: Category;
  tagsAssigned: Tag[];
  upvotes: string[];
  downvotes: string[];
  assets: Asset[];
  closed: boolean;
  createdAt: string;
  updatedAt: string;
}

const TopicViewTestData1: ForumTopic = {
  id: 1,
  hash: "Test",
  title: "Test",
  creator: {
    username: "Test",
    wallet: "Test",
    avatar: "Test",
    badge: "Test",
    role: "Test",
  },
  avatar: "Test",
  content: "Test",
  categoryAssigned: {
    name: "Test",
    color: "Test",
  },
  tagsAssigned: [{ name: "Test" }],
  upvotes: ["Test"],
  downvotes: ["Test"],
  assets: [],
  closed: false,
  createdAt: "Test",
  updatedAt: "Test",
};

describe("TopicView test", () => {
  let server: Server;
  beforeEach(() => {
    server = startForumServer();
  });
  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  test("render test", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <HomeView pageSize={10} category="" tags={[]} />
        <HomeView pageSize={10} category="Test" tags={[]} />
        <HomeView pageSize={10} category="" tags={["Test"]} />
      </QueryClientProvider>
    );
  });

  test("pop  test", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <HomeView pageSize={10} category="Test" tags={[]} />
      </QueryClientProvider>
    );

    const homeViewPop = screen.getByTestId("HomeViewPop");
    const HomeViewUp = screen.getByTestId("HomeViewUp");
    const HomeViewDown = screen.getByTestId("HomeViewDown");
    fireEvent.press(homeViewPop);
    fireEvent.press(HomeViewUp);
    fireEvent.press(HomeViewDown);
    expect(mockedNavigate.call.length).toBe(1);
  });

  test("pop  test", () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <HomeView pageSize={10} category="Test" tags={[]} />
      </QueryClientProvider>
    );

    const homeViewPop = screen.getByTestId("HomeViewPop");
    fireEvent.press(homeViewPop);
    expect(mockedNavigate.call.length).toBe(1);
  });

  test("error test", () => {
    const queryClient = new QueryClient();
    server.post(APIConfig["forum.topic.list"], () => new Response(500));

    render(
      <QueryClientProvider client={queryClient}>
        <HomeView pageSize={10} category="" tags={[]} />
      </QueryClientProvider>
    );
  });
});