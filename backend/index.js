import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { Video, Rooms, Comments, usersTable } from "./models/stream.js";
import { startIo } from "./socket/chatroom.js";
import { checkStreamKey } from "./utils/streamKey.js";

const PORT = 3535;

// 網站總共有多少部影片
const siteVideos = {
  1: {
    type: "video",
    title: "how programmers overprepare for job interviews",
    author: "Joma Tech",
    content: "asdsadsa",
    thumbnail: "images/2.jpg",
    startTime: 167575949764,
    comments: new Comments(),
  },
  2: {
    type: "video",
    title: "年薪300萬工程師辭職重考醫學系 醫: 腦袋壞掉",
    author: "蒼藍鴿的醫學天地",
    content: "asdsadsa",
    thumbnail: "images/2.jpg",
  },
  3: {
    title:
      "【中文配音心得26-鬼滅之刃遊廓篇(下)】台灣聲優竭盡全力的嘶吼，童磨的聲線帥到出水！",
    author: "台灣聲優研究所",
    content: "asdsadsa",
    thumbnail: "images/2.jpg",
  },
  4: {
    title:
      "Git for Professionals Tutorial - Tools & Concepts for Mastering Version Control with Git",
    author: "freeCodeCamp.org",
    content: "asdsadsa",
    thumbnail: "images/2.jpg",
  },
  5: {
    type: "video",
    title: "是什麼讓事情變得「卡夫卡式」？　諾亞.泰夫林",
    author: "TED-Ed",
    content: "asdsadsa",
    thumbnail: "images/1.jpg",
  },
  6: {
    type: "video",
    title: "【アニメ】あっははインドネシア〜！",
    author: "hololive ホロライブ - VTuber Group",
    content: "asdsadsa",
    thumbnail: "images/3.jpg",
  },
  7: {
    type: "video",
    title: "星街すいせい - みちづれ / THE FIRST TAKE",
    author: "THE FIRST TAKE",
    content: "asdsadsa",
    thumbnail: "images/3.jpg",
  },
  8: {
    type: "video",
    title: "CCC",
    author: "AAA",
    content: "asdsadsa",
    thumbnail: "images/3.jpg",
  },
  9: {
    type: "video",
    title: "DDDD",
    author: "AAA",
    content: "asdsadsa",
    thumbnail: "images/3.jpg",
  },
  10: {
    type: "video",
    title: "adasdas",
    author: "AAA",
    content: "asdsadsa",
    thumbnail: "images/1.jpg",
  },
  11: {
    type: "video",
    title: "adasdas",
    author: "AAA",
    content: "asdsadsa",
    thumbnail: "images/1.jpg",
  },
};

// 假資料
const video = siteVideos[1];
const comments = [
  {
    comment: {
      time: 1675759497647,
      user: { username: "Sans" },
      message: { text: "1" },
    },
  },
  {
    comment: {
      time: 1675759497786,
      user: { username: "Sans" },
      message: { text: "2" },
    },
  },
  {
    comment: {
      time: 1675759498151,
      user: { username: "Sans" },
      message: { text: "3" },
    },
  },
  {
    comment: {
      time: 1675759498217,
      user: { username: "Sans" },
      message: { text: "4" },
    },
  },
  {
    comment: {
      time: 1675759498330,
      user: { username: "Sans" },
      message: { text: "5" },
    },
  },
  {
    comment: {
      time: 1675759498456,
      user: { username: "Sans" },
      message: { text: "6" },
    },
  },
  {
    comment: {
      time: 1675759498557,
      user: { username: "Sans" },
      message: { text: "7" },
    },
  },
  {
    comment: {
      time: 1675759498662,
      user: { username: "Sans" },
      message: { text: "8" },
    },
  },
  {
    comment: {
      time: 1675759498790,
      user: { username: "Sans" },
      message: { text: "9" },
    },
  },
  {
    comment: {
      time: 1675759498800,
      user: { username: "Sans" },
      message: { text: "10" },
    },
  },
  {
    comment: {
      time: 1675759498820,
      user: { username: "Sans" },
      message: { text: "11" },
    },
  },
  {
    comment: {
      time: 1675759498900,
      user: { username: "Sans" },
      message: { text: "12" },
    },
  },
  {
    comment: {
      time: 1675759499000,
      user: { username: "Sans" },
      message: { text: "13" },
    },
  },
  {
    comment: {
      time: 1675759499200,
      user: { username: "Sans" },
      message: { text: "14" },
    },
  },
  {
    comment: {
      time: 1675759500200,
      user: { username: "Sans" },
      message: { text: "15" },
    },
  },
  {
    comment: {
      time: 1675759500900,
      user: { username: "Sans" },
      message: { text: "16" },
    },
  },
  {
    comment: {
      time: 1675759501000,
      user: { username: "Sans" },
      message: { text: "17" },
    },
  },
  {
    comment: {
      time: 1675759501200,
      user: { username: "Sans" },
      message: { text: "18" },
    },
  },
  {
    comment: {
      time: 1675759502200,
      user: { username: "Sans" },
      message: { text: "19" },
    },
  },
  {
    comment: {
      time: 1675759503200,
      user: { username: "Sans" },
      message: { text: "20" },
    },
  },
  {
    comment: {
      time: 1675759503210,
      user: { username: "Sans" },
      message: { text: "21" },
    },
  },
  {
    comment: {
      time: 1675759504200,
      user: { username: "Sans" },
      message: { text: "22" },
    },
  },
  {
    comment: {
      time: 1675759505200,
      user: { username: "Sans" },
      message: { text: "23" },
    },
  },
  {
    comment: {
      time: 1675759506200,
      user: { username: "Sans" },
      message: { text: "24" },
    },
  },
  {
    comment: {
      time: 1675759507200,
      user: { username: "Sans" },
      message: { text: "25" },
    },
  },
  {
    comment: {
      time: 1675759508200,
      user: { username: "Sans" },
      message: { text: "26" },
    },
  },
  {
    comment: {
      time: 1675759509200,
      user: { username: "Sans" },
      message: { text: "27" },
    },
  },
  {
    comment: {
      time: 1675759510200,
      user: { username: "Sans" },
      message: { text: "28" },
    },
  },
  {
    comment: {
      time: 1675759511200,
      user: { username: "Sans" },
      message: { text: "29" },
    },
  },
  {
    comment: {
      time: 1675759512200,
      user: { username: "Sans" },
      message: { text: "30" },
    },
  },
  {
    comment: {
      time: 1675759513200,
      user: { username: "Sans" },
      message: { text: "31" },
    },
  },
  {
    comment: {
      time: 1675759514200,
      user: { username: "Sans" },
      message: { text: "32" },
    },
  },
  {
    comment: {
      time: 1675759515200,
      user: { username: "Sans" },
      message: { text: "33" },
    },
  },
  {
    comment: {
      time: 1675759516200,
      user: { username: "Sans" },
      message: { text: "34" },
    },
  },
  {
    comment: {
      time: 1675759517200,
      user: { username: "Sans" },
      message: { text: "35" },
    },
  },
  {
    comment: {
      time: 1675759518200,
      user: { username: "Sans" },
      message: { text: "36" },
    },
  },
];
comments.map((comment) => {
  const c = comment.comment;
  video.comments.addFakeComment(c.time, c.user, c.message);
});

export const videos = new Video(siteVideos);
export const rooms = new Rooms();

// 加入假的 user 進 rooms
rooms.addRoom("user01");
rooms.addRoom("123");

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    preflightContinue: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

startIo(io);

app.post("/auth/on_publish", (req, res) => {
  console.log("驗證 stream key '/auth/on_publish");
  const { name: streamKey } = req.body;

  // 判斷 streamKey 是否為此網站產生的
  // 收到的 stream key 為 16 進位字串，需要解碼後再解析
  const username = checkStreamKey(streamKey);

  // 非網站產生 stream key(secret key 不同)
  if (!username) {
    return res.status(500).send("stream key was wrong");
  }
  // 確認是否有該 user
  const user = usersTable.find((user) => user.username === username);

  if (!user) {
    console.log("無此 user");
    return res.status(500).send("stream key was wrong");
  }

  console.log("驗證成功！");

  // 取得新的 videoId
  const videoId = videos.newVideoId();

  // 利用新的 streamKey(videoId) 推到 nginx，同時需要推送 username，nginx 會自動將 params(username) 當成 post data 傳至 on_publish 及 on_publish_done

  res
    .status(301)
    .redirect(
      `${process.env.STREAM_SERVER_URL}/hls_live/${videoId}?username=${username}`
    );
});

app.post("/rtmp/on_publish", (req, res) => {
  console.log("直播開始 'on_publish");
  const { username, name: videoId } = req.body;

  const user = usersTable.find((user) => user.username === username);

  // 直播狀態改為 on，用於使用者進入直播間時可自動去抓取直播資源，videoId 用來取得影片位置
  user.stream.startTime = Date.now();
  user.stream.isStreamOn = true;
  user.stream.videoId = videoId;

  // 傳送直播開始訊息，用於刷新影片
  io.to(username).emit("stream-connected", { videoId });

  res.status(204).end();
});

app.post("/rtmp/on_publish_done", async (req, res) => {
  console.log("直播結束 'on_publish_done'");
  const { name: videoId, username } = req.body;

  // 取得此 streamKey 的擁有者
  const user = usersTable.find((user) => user.username === username);

  // room 名稱與 username 相同，取得此 room 的 comments

  const { comments } = rooms[username];

  // console.log({ comments });
  const { title, content, startTime } = user.stream;

  // 將此直播紀錄(影片、聊天室)儲存在 siteVideos 內
  videos.createVideo(videoId, {
    title,
    content,
    startTime,
    comments,
    type: "video"
  });

  // 將影片加至 user 的 videos 內
  user.videos.addVideo({
    videoId,
    title,
    content,
    startTime,
    comments,
    type: "video",
  });

  user.stream.isStreamOn = false;
  user.stream.videoId = "";

  rooms.initialRoom(username);

  // writeFile("video.json", JSON.stringify(user.videos));
  // console.log(user.videos);

  res.status(204).end();
});

// 初次建立直播間，未建立直播間則無法開實況
app.post("/u/:username/stream-room", (req, res) => {
  res.send("success");
});

app.post("/sign-up", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      throw new Error("Empty value");
    }

    // check username or email weren't duplicate
    const isDuplicate = usersTable.some(
      (user) => user.username === username || user.email === email
    );

    if (isDuplicate) {
      throw new Error("Duplicate account or email");
    }

    const user = await usersTable.generateNewUser(username, password, email);
    rooms.addRoom(username);

    res.status(200).json({
      message: "Register success",
      user,
    });
  } catch (error) {
    const { message } = error;
    res.status(400).json({
      message,
    });
  }
});

app.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Empty value");
    }

    const user = usersTable.verifyUser(username, password);

    if (!user) {
      throw new Error("Verify wrong");
    }

    res.status(200).json({
      message: "Login success",
      user,
    });
  } catch (error) {
    const { message } = error;
    res.status(400).json({
      message,
    });
  }
});

app.post("/users/:username", (req, res) => {
  try {
    const { username } = req.params;
    if (!username) return;
    const data = usersTable.getMe(username);

    res.json({ message: "success", data });
  } catch (error) {
    const { message } = error;
    res.json({ message });
  }
});

app.post("/streams", (req, res) => {
  const { page, limit } = req.body;

  const start = (page - 1) * limit;
  const end = page * limit;

  const streams = usersTable
    .filter((user) => user.stream.isStreamOn)
    .slice(start, end)
    .map((user) => user.stream);

  res.json({ message: "success", streams });
});

app.post("/streams/:username", (req, res) => {
  try {
    const { username } = req.params;
    if (!username) return;

    const streamMeta = usersTable.getMe(username);

    res.json({
      message: "success",
      data: {
        ...streamMeta,
      },
    });
  } catch (error) {
    const { message } = error;
    res.json({ message });
  }
});

app.post("/streams/:username/streamKey", (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      throw new Error("Empty value!");
    }

    const streamKey = usersTable.refreshStreamKey(username);

    res.json({ message: "success", streamKey });
  } catch (error) {
    const { message } = error;

    res.status(400).json({ message });
  }
});

app.put("/users/:username", (req, res) => {
  try {
    const { username } = req.params;
    const { title, content } = req.body;

    if (!username || !title) {
      throw new Error("Empty data!");
    }

    const userMeta = usersTable.editUserMeta(username, {
      stream: {
        title,
        content,
      },
    });

    res.json({
      message: "success",
      data: {
        ...userMeta,
      },
    });
  } catch (error) {
    const { message } = error;

    res.json({ message });
  }
});

app.post("/videos", (req, res) => {
  const { page, limit } = req.body;

  const start = (page - 1) * limit;
  const end = page * limit;

  const sliceVideos = Object.entries(videos)
    .slice(start, end)
    .map((entry) => ({
      id: entry[0],
      ...entry[1],
    }));

  res.json({
    message: "success",
    videos: sliceVideos,
  });
});

app.post("/videos/:videoId", (req, res) => {
  try {
    const { videoId } = req.params;
    const video = videos.getVideo(videoId);

    res.json({ message: "success", video });
  } catch (error) {
    const { message } = error;
    res.status(400).json({
      message,
    });
  }
});

app.post("/videos/:videoId/comments", (req, res) => {
  const { videoId } = req.params;
  const { time, mode } = req.body;

  const comments = videos.getVideoComments(videoId, time, mode);

  res.json({ message: "success", comments });
});

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`);
});