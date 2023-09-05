/**
 * @summary Manage local storage
 * @author Bojun Ren
 * @data 2023/07/14
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

const storageName = {
  userCount: "user-count", // initial: 0
  isFirstLaunch: "FIRST-LAUNCH", // initial: false
  userId: (id: number) => `user-${id}`,
};

/**
 * Called when APP is loaded for first time.
 */
async function initializeGlobal() {
  const isFirstTime = await AsyncStorage.getItem(
    storageName.isFirstLaunch
  ).then(
    (val) => !(val === "false") // val can be "true" | "false" | null
  );
  if (!isFirstTime) {
    return;
  }
  await Promise.all([
    AsyncStorage.setItem(storageName.isFirstLaunch, "false"),
    AsyncStorage.setItem(storageName.userCount, "0"),
  ]);
}

/**
 * Initialize the APP's storage system.
 * Must be called at the App's very top.
 */
export default async function configure(): Promise<void> {
  await initializeGlobal();
}

export { storageName };
