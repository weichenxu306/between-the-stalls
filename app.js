const state = {
  lang: "zh",
  activeMedia: "xinjiang-bazaar",
  activeIndex: 0,
  chart: "distribution",
  survey: "consumer",
  regression: "total",
  expandedArticles: new Set(),
  theme: "light"
};

const researchData = {
  regressionResults: [
    {
      id: "total",
      label: { zh: "总样本", en: "All respondents" },
      n: 90,
      r2: 0.598,
      interpretation: {
        zh: "用 90 份消费者问卷中的五个变量做探索性回归，看看这些回答之间有哪些关联。",
        en: "This exploratory regression uses five variables from 90 consumer questionnaires to look for relationships within the sample."
      },
      variables: [
        reg("delta_score", "价格变化评分", "Price-change score", 0.842),
        reg("trust_score", "信任评分", "Trust score", -0.224),
        reg("price_priority", "价格优先度", "Price priority", -0.336),
        reg("space_cost", "空间成本", "Spatial cost", 0.189),
        reg("search_behavior", "搜索行为", "Search behavior", 0.032)
      ]
    },
    {
      id: "elder",
      label: { zh: "年长组", en: "Older respondents" },
      n: 75,
      r2: 0.642,
      interpretation: {
        zh: "年长组有 75 份问卷。单独分析这组回答，可以为后续研究提供线索，但这里没有检验年龄的影响。",
        en: "The older group has 75 responses. Analyzing them separately can suggest questions for further research, but this model does not test the effect of age."
      },
      variables: [
        reg("delta_score", "价格变化评分", "Price-change score", 0.925),
        reg("trust_score", "信任评分", "Trust score", -0.202),
        reg("price_priority", "价格优先度", "Price priority", -0.282),
        reg("space_cost", "空间成本", "Spatial cost", 0.171),
        reg("search_behavior", "搜索行为", "Search behavior", 0.035)
      ]
    },
    {
      id: "young",
      label: { zh: "年轻组", en: "Younger respondents" },
      n: 15,
      r2: 0.482,
      interpretation: {
        zh: "年轻组只有 15 份问卷，个别回答就可能明显影响估计结果，不能据此推断其他年轻消费者的情况。",
        en: "The younger group has only 15 responses. Individual answers can strongly affect the estimates, so the results cannot be generalized to other younger consumers."
      },
      variables: [
        reg("delta_score", "价格变化评分", "Price-change score", 0.552),
        reg("trust_score", "信任评分", "Trust score", -0.569),
        reg("price_priority", "价格优先度", "Price priority", -0.590),
        reg("space_cost", "空间成本", "Spatial cost", 0.154),
        reg("search_behavior", "搜索行为", "Search behavior", 0.126)
      ]
    },
    {
      id: "lowedu",
      label: { zh: "低教育组", en: "Lower education" },
      n: 59,
      r2: 0.699,
      interpretation: {
        zh: "较低教育组有 59 份问卷。这些系数反映组内变量之间的关联，不能说明教育程度如何影响选择。",
        en: "This group has 59 responses from people with lower levels of education. The coefficients describe relationships within the group; they do not show how education affects choices."
      },
      variables: [
        reg("delta_score", "价格变化评分", "Price-change score", 1.113),
        reg("trust_score", "信任评分", "Trust score", -0.412),
        reg("price_priority", "价格优先度", "Price priority", -0.201),
        reg("space_cost", "空间成本", "Spatial cost", 0.015),
        reg("search_behavior", "搜索行为", "Search behavior", 0.130)
      ]
    },
    {
      id: "highedu",
      label: { zh: "高教育组", en: "Higher education" },
      n: 31,
      r2: 0.630,
      interpretation: {
        zh: "较高教育组有 31 份问卷。各组的系数虽有不同，但尚未检验这些差异是否具有统计意义。",
        en: "This group has 31 responses from people with higher levels of education. Coefficients differ across groups, but those differences have not been tested for statistical significance."
      },
      variables: [
        reg("delta_score", "价格变化评分", "Price-change score", 0.783),
        reg("trust_score", "信任评分", "Trust score", -0.245),
        reg("price_priority", "价格优先度", "Price priority", -0.484),
        reg("space_cost", "空间成本", "Spatial cost", 0.137),
        reg("search_behavior", "搜索行为", "Search behavior", 0.002)
      ]
    }
  ]
};

function reg(key, zh, en, coef) {
  return { key, zh, en, coef };
}

const articleGroups = [
  {
    title: { zh: "顾客怎么选", en: "How customers choose" },
    articles: [
      {
        tag: { zh: "消费者", en: "Customers" },
        title: { zh: "价格与选择", en: "Price and choice" },
        summary: {
          zh: "受访者普遍表示，摊位价格更低或临时降价，会影响自己的选择。",
          en: "Respondents generally said that lower stall prices or a sudden price cut would influence their choices."
        },
        detail: {
          zh: "问卷问了两种情况：摊位比商超便宜时会不会选择摊位，以及突然降价会不会改变购买计划。回答反映了受访者对价格的看法；要知道他们实际怎么买，还需要观察真实交易。",
          en: "The survey asked whether people would choose a stall over a supermarket if it was cheaper, and whether a sudden price cut would change their plans. Their answers describe what they say they would do; actual purchases were not measured."
        },
        media: "xinjiang-bazaar"
      },
      {
        tag: { zh: "消费者", en: "Customers" },
        title: { zh: "熟悉的摊主与服务", en: "Familiar vendors and service" },
        summary: {
          zh: "有些受访者愿意为熟悉的摊主和更好的服务多付一点钱。",
          en: "Some respondents said they would pay a little more for a familiar vendor or better service."
        },
        detail: {
          zh: "问卷分别询问了熟悉摊主和服务体验。这留下一个值得继续追问的问题：顾客选摊位时，价格、对商品的放心程度，以及和摊主的关系，各有多大分量？",
          en: "Familiarity and service were asked about separately. A question for further study is how customers weigh price, confidence in the goods, and their relationship with the vendor."
        },
        media: "xinjiang-questionnaire"
      },
      {
        tag: { zh: "消费者", en: "Customers" },
        title: { zh: "摊位之间的比较", en: "Comparing stalls" },
        summary: {
          zh: "受访者倾向于先比较几家摊位，再决定买哪一家。",
          en: "Respondents tended to favour comparing a few stalls before deciding where to buy."
        },
        detail: {
          zh: "离入口近是否方便、愿不愿为低价多走几步、会不会比较多家摊位，问卷分别问了这些问题。回答说明距离和比较过程值得研究，但还不能判断，其他购物体验是否足以抵消多走路的成本。",
          en: "The survey asked separately about stalls near the entrance, walking farther for a lower price, and comparing vendors. These answers make distance and search worth examining, but do not tell us whether other parts of the shopping experience make up for the extra walk."
        },
        media: "suzhou"
      }
    ]
  },
  {
    title: { zh: "摊主怎么做", en: "How vendors respond" },
    articles: [
      {
        tag: { zh: "商户", en: "Vendors" },
        title: { zh: "摊主如何定价", en: "How vendors set prices" },
        summary: {
          zh: "受访摊主在问卷中表示，会留意同行的价格，也倾向于随之调整自己的报价。",
          en: "Vendors said they watch competitors’ prices and tend to adjust their own."
        },
        detail: {
          zh: "别家改价时如何应对、要不要跟着降价、是否坚持原价，是问卷中的几个问题。回答让我们了解摊主如何考虑定价，但调查没有直接测量这些做法带来的利润。",
          en: "The questions covered reacting to other vendors’ price changes, matching a price cut, and holding a price steady. The answers describe how vendors think about pricing; the survey did not measure how these decisions affected profit."
        },
        media: "xinjiang-producer"
      },
      {
        tag: { zh: "商户", en: "Vendors" },
        title: { zh: "摊位位置", en: "Stall location" },
        summary: {
          zh: "受访摊主很在意摊位设在哪里，以及周围摊位带来的竞争。",
          en: "Vendors placed importance on their stall’s location and competition for space."
        },
        detail: {
          zh: "位置是否影响销量、摊位之间如何争夺空间、角落位置是否吃亏，都是摊主回答的问题。这些是他们的经营感受，不能直接用来计算换一个位置会增加多少销量或利润。",
          en: "Vendors were asked how location relates to sales, how stalls compete for space, and whether a corner stall is at a disadvantage. These are their views, rather than measurements of how a different location would change sales or profit."
        },
        media: "chongqing"
      },
      {
        tag: { zh: "放在一起看", en: "Putting it together" },
        title: { zh: "价格、信任与距离", en: "Price, trust and distance" },
        summary: {
          zh: "选择哪家摊位，可能同时牵涉价格、信任和距离。",
          en: "Choosing a stall may involve price, trust, and distance at the same time."
        },
        detail: {
          zh: "问卷和现场照片把几个问题放到了一起：人们怎样比价，会不会选择熟悉的摊主，又愿意走多远去找另一家。要弄清它们如何相互影响，还需要更多样本和更细致的测量。",
          en: "The questionnaires and photographs bring together questions about comparing prices, choosing familiar vendors, and walking to another stall. More responses and better-defined measures are still needed to establish how these factors interact."
        },
        media: "xinjiang-bazaar"
      }
    ]
  }
];

const mediaGroups = [
  {
    id: "xinjiang-bazaar",
    title: { zh: "新疆市集", en: "Xinjiang markets" },
    article: { zh: "相关主题：价格与选择 / 价格、信任与距离", en: "Related topics: price and choice; price, trust and distance" },
    items: ["bazzar-1.jpg", "bazzar-2.jpg", "bazzar-3.jpg", "bazzar-4.jpg", "bazzar-5.jpg"].map(file => item(`xinjiangbazaar/${file}`, "image"))
  },
  {
    id: "xinjiang-producer",
    title: { zh: "新疆摊主", en: "Vendors in Xinjiang" },
    article: { zh: "相关主题：摊主如何定价", en: "Related topic: how vendors set prices" },
    items: ["people-producer.jpg", "people-producer-8.jpg", "people-producer-7.jpg", "people-producer-6.jpg", "people-producer-5.jpg", "People-producer-4.jpg", "People-Producer-3.jpg", "People-producer-2.jpg"].map(file => item(`xinjiangbazaar/${file}`, "image"))
  },
  {
    id: "xinjiang-questionnaire",
    title: { zh: "新疆问卷调查", en: "Survey work in Xinjiang" },
    article: { zh: "相关主题：熟悉的摊主与服务", en: "Related topic: familiar vendors and service" },
    items: ["People-questionnaire-1.jpg", "people-questionnaire-2.jpg", "People-questionnaire-3.jpg", "people-questionnaire-4.jpg", "people-questonnaire-5.jpg", "people-questionnaire-6.jpg"].map(file => item(`xinjiangbazaar/${file}`, "image"))
  },
  {
  "id": "xinjiang-return",
  "title": {
    "zh": "重返新疆",
    "en": "Returning to Xinjiang"
  },
  "article": {
    "zh": "和摊主一起看研究手册",
    "en": "Sharing the research booklet with market vendors"
  },
  "items": [
    {
      "src": "assets/xinjiang-return-03.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "和两位摊主一起看手册。",
        "en": "Looking through the booklet with two vendors."
      },
      "alt": {
        "zh": "徐玮晨与两位摊主微笑着交流，手中展开研究手册",
        "en": "Weichen Xu and two vendors smile as they look through the research booklet"
      }
    },
    {
      "src": "assets/xinjiang-return-04.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "和摊主聊聊手册里的内容。",
        "en": "Talking about the booklet with a vendor."
      },
      "alt": {
        "zh": "徐玮晨拿着研究手册与一位坐在摊位前的摊主交流",
        "en": "Weichen Xu holds the research booklet while speaking with a seated vendor"
      }
    },
    {
      "src": "assets/xinjiang-return-05.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "坐在鞋摊旁聊天。",
        "en": "A conversation beside the shoe stall."
      },
      "alt": {
        "zh": "徐玮晨拿着手册坐在鞋摊旁，与摊位上的人交流",
        "en": "Weichen Xu sits beside a shoe stall with the booklet, talking with people at the stall"
      }
    },
    {
      "src": "assets/xinjiang-return-06.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "在服装摊前介绍研究手册。",
        "en": "Sharing the booklet at a clothing stall."
      },
      "alt": {
        "zh": "徐玮晨与一位戴黄色围巾的摊主在服装摊前交流手册内容",
        "en": "Weichen Xu discusses the booklet with a vendor wearing a yellow scarf at a clothing stall"
      }
    },
    {
      "src": "assets/xinjiang-return-07.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "在饮品摊旁一起看手册。",
        "en": "Reading together beside a drinks stall."
      },
      "alt": {
        "zh": "徐玮晨与一位摊主在饮品摊旁一起看研究手册",
        "en": "Weichen Xu and a vendor look at the research booklet beside a drinks stall"
      }
    },
    {
      "src": "assets/xinjiang-return-08.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "这次带回市集的手册。",
        "en": "The booklet I brought back to the market."
      },
      "alt": {
        "zh": "徐玮晨手持《超越价格：集市里的经济学》手册与一杯饮品",
        "en": "Weichen Xu holds the research booklet Beyond Price: Economics in the Bazaar and a drink"
      }
    },
    {
      "src": "assets/xinjiang-return-09.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "回到蔬菜摊。",
        "en": "A return visit to a vegetable stall."
      },
      "alt": {
        "zh": "徐玮晨拿着手册蹲坐在蔬菜摊旁，对面是一位摊主",
        "en": "Weichen Xu holds the booklet beside a vegetable stall, opposite a vendor"
      }
    },
    {
      "src": "assets/xinjiang-return-10.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "和服装摊主一起翻手册。",
        "en": "Looking through the booklet with a clothing vendor."
      },
      "alt": {
        "zh": "徐玮晨与一位服装摊主一起阅读展开的研究手册",
        "en": "Weichen Xu and a clothing vendor read the open research booklet together"
      }
    },
    {
      "src": "assets/xinjiang-return-11.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "一起看手册里的照片和文字。",
        "en": "Looking through the photos and text together."
      },
      "alt": {
        "zh": "徐玮晨与一位戴黑色帽子的摊主一起翻阅研究手册",
        "en": "Weichen Xu and a vendor in a black cap look through the research booklet"
      }
    },
    {
      "src": "assets/xinjiang-return-12.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "拿着手册和摊主合影。",
        "en": "A photo with a vendor and the booklet."
      },
      "alt": {
        "zh": "徐玮晨手持研究手册，与一位摊主在市集遮阳棚下合影",
        "en": "Weichen Xu holds the research booklet for a photograph with a vendor under a market canopy"
      }
    },
    {
      "src": "assets/xinjiang-return-13.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "在食品摊前一起看手册。",
        "en": "Reading the booklet together at a food stall."
      },
      "alt": {
        "zh": "徐玮晨与一位坐在食品摊前的摊主一起看研究手册",
        "en": "Weichen Xu looks through the research booklet with a vendor seated at a food stall"
      }
    },
    {
      "src": "assets/xinjiang-return-14.jpg",
      "type": "image",
      "width": 1706,
      "height": 1279,
      "caption": {
        "zh": "接受采访",
        "en": "Being interviewed at the market."
      },
      "alt": {
        "zh": "徐玮晨在市集接受采访，手中拿着研究手册",
        "en": "Weichen Xu being interviewed at the market while holding the research booklet"
      }
    }
  ]
},
  {
    id: "suzhou",
    title: { zh: "苏州市集", en: "Suzhou markets" },
    article: { zh: "相关主题：摊位之间的比较", en: "Related topic: comparing stalls" },
    items: Array.from({ length: 10 }, (_, i) => item(`suzhou/suzhou-${i + 1}.jpg`, "image"))
  },
  {
    id: "chongqing",
    title: { zh: "重庆市集", en: "Chongqing markets" },
    article: { zh: "相关主题：摊位位置", en: "Related topic: stall location" },
    items: Array.from({ length: 9 }, (_, i) => item(`chongqing/chongqing-product-${i + 1}.jpg`, "image"))
  }
];

function item(src, type) {
  const portrait = /chongqing-product-[1234678]\.jpg$/i.test(src);
  const large = /people-producer-[456]\.jpg$/i.test(src);
  return { src, type, width: large ? 5712 : portrait ? 1279 : 1706, height: large ? 4284 : portrait ? 1706 : 1279 };
}

function t(value) {
  return typeof value === "string" ? value : value[state.lang];
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function applyLanguage() {
  document.title = state.lang === "zh" ? "市集之间 · Between the Stalls — 徐玮晨" : "Between the Stalls — A Field Study by Weichen Xu";
  document.querySelectorAll("[data-alt-zh][data-alt-en]").forEach(el => { el.alt = state.lang === "zh" ? el.dataset.altZh : el.dataset.altEn; });
  document.querySelectorAll("[data-label-zh][data-label-en]").forEach(el => { el.setAttribute("aria-label", state.lang === "zh" ? el.dataset.labelZh : el.dataset.labelEn); });
  document.documentElement.lang = state.lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-zh][data-en]").forEach(node => {
    node.textContent = node.dataset[state.lang];
  });
  const languageButton = document.getElementById("langToggle");
  languageButton.textContent = state.lang === "zh" ? "EN" : "中";
  languageButton.setAttribute("aria-label", state.lang === "zh" ? "Switch to English" : "切换为中文");
  document.getElementById("prevMedia").setAttribute("aria-label", state.lang === "zh" ? "上一张照片" : "Previous photo");
  document.getElementById("nextMedia").setAttribute("aria-label", state.lang === "zh" ? "下一张照片" : "Next photo");
  document.getElementById("closeLightbox").setAttribute("aria-label", state.lang === "zh" ? "关闭照片" : "Close photo");
  document.getElementById("lightbox").setAttribute("aria-label", state.lang === "zh" ? "查看照片" : "Photo viewer");
  updateThemeLabel();
  updateMenuLabel();
  renderArticles();
  renderMediaTabs();
  renderFeaturedMedia();
  renderMediaGrid();
  renderChart();
  renderRegression();
}

function renderArticles() {
  const root = document.getElementById("articleGroups");
  root.innerHTML = articleGroups.map((group, groupIndex) => `
    <div class="article-group">
      <h3 class="group-title">${t(group.title)}</h3>
      ${group.articles.map((article, index) => {
        const key = `${groupIndex}-${index}`;
        const expanded = state.expandedArticles.has(key);
        return `
        <article class="article-card${expanded ? " open" : ""}" data-index="${String(index + 1).padStart(2, "0")}">
          <span class="article-meta">${t(article.tag)}</span>
          <h4>${t(article.title)}</h4>
          <p>${t(article.summary)}</p>
          <button class="article-toggle" type="button" data-article="${key}" aria-expanded="${expanded}" aria-controls="article-detail-${key}">${articleToggleLabel(expanded)}</button>
          <div class="article-detail" id="article-detail-${key}"${expanded ? "" : " hidden"}>
            <p>${t(article.detail)}</p>
            <a class="article-toggle jump-media" href="#media" data-media="${article.media}">${state.lang === "zh" ? "看相关照片" : "See related photos"}</a>
          </div>
        </article>
      `; }).join("")}
    </div>
  `).join("");

  root.querySelectorAll(".article-card > .article-toggle").forEach(button => {
    button.addEventListener("click", () => {
      const key = button.dataset.article;
      const expanded = !state.expandedArticles.has(key);
      if (expanded) state.expandedArticles.add(key);
      else state.expandedArticles.delete(key);
      button.closest(".article-card").classList.toggle("open", expanded);
      button.setAttribute("aria-expanded", String(expanded));
      button.textContent = articleToggleLabel(expanded);
      document.getElementById(button.getAttribute("aria-controls")).hidden = !expanded;
    });
  });
  root.querySelectorAll(".jump-media").forEach(link => {
    link.addEventListener("click", () => {
      selectMediaGroup(link.dataset.media);
    });
  });
}

function articleToggleLabel(expanded) {
  if (state.lang === "zh") return expanded ? "收起" : "继续阅读";
  return expanded ? "Show less" : "Read more";
}

function currentMediaGroup() {
  return mediaGroups.find(group => group.id === state.activeMedia) || mediaGroups[0];
}

function renderMediaTabs() {
  const root = document.getElementById("mediaTabs");
  root.innerHTML = mediaGroups.map(group => `
    <button class="media-tab ${group.id === state.activeMedia ? "active" : ""}" type="button" data-id="${group.id}" aria-pressed="${group.id === state.activeMedia}">
      ${t(group.title)}
    </button>
  `).join("");
  root.querySelectorAll(".media-tab").forEach(button => {
    button.addEventListener("click", () => {
      selectMediaGroup(button.dataset.id);
      root.querySelector(`[data-id="${state.activeMedia}"]`).focus({ preventScroll: true });
    });
  });
}

function selectMediaGroup(id, index = 0) {
  if (!mediaGroups.some(group => group.id === id)) return;
  state.activeMedia = id;
  state.activeIndex = Math.max(0, Math.min(index, currentMediaGroup().items.length - 1));
  renderMediaTabs();
  renderFeaturedMedia();
  renderMediaGrid();
}

function mediaElement(media, alt, interactive = false) {
  if (alt && media.alt) alt = t(media.alt);
  if (media.type === "video") {
    return `<video src="${media.src}" controls playsinline preload="metadata" aria-label="${escapeHtml(alt)}" ${interactive ? "" : "muted"}></video>`;
  }
  return `<img src="${media.src}" alt="${escapeHtml(alt)}" width="${media.width}" height="${media.height}" loading="${interactive ? "eager" : "lazy"}" decoding="async">`;
}

function renderFeaturedMedia() {
  const group = currentMediaGroup();
  const media = group.items[state.activeIndex] || group.items[0];
  document.getElementById("featuredMedia").innerHTML = `
    ${mediaElement(media, `${t(group.title)} · ${state.activeIndex + 1}`, true)}
    <div class="caption">
      <strong>${t(group.title)}</strong>
      <span>${escapeHtml(t(media.caption || group.article))}</span>
      <span class="media-count">${String(state.activeIndex + 1).padStart(2, "0")} / ${String(group.items.length).padStart(2, "0")}</span>
    </div>
  `;
  const status = document.getElementById("mediaStatus");
  if (status) status.textContent = state.lang === "zh"
    ? `${t(group.title)}，第 ${state.activeIndex + 1} 张，共 ${group.items.length} 张`
    : `${t(group.title)}, photo ${state.activeIndex + 1} of ${group.items.length}`;
}

function renderMediaGrid() {
  const group = currentMediaGroup();
  const root = document.getElementById("mediaGrid");
  root.innerHTML = group.items.map((media, index) => `
    <button class="media-card" type="button" data-index="${index}" aria-label="${escapeHtml(t(media.caption || group.title))} · ${index + 1}${state.lang === "zh" ? "，放大照片" : ", enlarge photo"}">
      ${mediaElement(media, "")}
      <span class="caption">${t(group.title)} · ${index + 1}</span>
    </button>
  `).join("");
  root.querySelectorAll(".media-card").forEach(card => {
    card.addEventListener("click", () => {
      state.activeIndex = Number(card.dataset.index);
      renderFeaturedMedia();
      openLightbox(currentMediaGroup().items[state.activeIndex]);
    });
  });
}

function cycleMedia(delta) {
  const group = currentMediaGroup();
  state.activeIndex = (state.activeIndex + delta + group.items.length) % group.items.length;
  renderFeaturedMedia();
}

function openLightbox(media) {
  const lightbox = document.getElementById("lightbox");
  const content = document.getElementById("lightboxContent");
  const group = currentMediaGroup();
  lightboxReturnFocus = document.activeElement;
  content.innerHTML = mediaElement(media, `${t(group.title)} · ${state.activeIndex + 1}`, true)
    + (media.caption ? `<p class="lightbox-caption">${escapeHtml(t(media.caption))} <span>${String(state.activeIndex + 1).padStart(2, "0")} / ${group.items.length}</span></p>` : "");
  lightbox.showModal();
  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  document.getElementById("closeLightbox").focus();
}

let surveyData = null;
let surveyLoadFailed = false;
const surveyThemes = {
  price: { zh: "价格与选择", en: "Price & choice" },
  trust: { zh: "信任与服务", en: "Trust & service" },
  space: { zh: "步行与比较", en: "Walking & comparison" },
  location: { zh: "摊位位置", en: "Stall location" }
};
const surveyCopy = (zh, en) => state.lang === "zh" ? zh : en;
const surveyPercent = value => `${value.toFixed(1)}%`;
const surveyMean = value => new Intl.NumberFormat("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

async function loadSurveyData() {
  surveyLoadFailed = false;
  renderChart();
  try {
    const response = await fetch("data/verified-survey-summary.json?v=20261009-copy");
    if (!response.ok) throw new Error("Questionnaire summary unavailable");
    const data = await response.json();
    if (!data.groups?.every(group => group.items?.length)) throw new Error("Invalid questionnaire summary");
    surveyData = data;
  } catch {
    surveyLoadFailed = true;
  }
  renderChart();
}

function renderChart() {
  const root = document.getElementById("surveyResults");
  document.querySelectorAll(".chart-btn, .survey-group").forEach(button => {
    const active = button.dataset.chart ? button.dataset.chart === state.chart : button.dataset.survey === state.survey;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  if (!surveyData) {
    root.innerHTML = `<p class="survey-view-note">${surveyLoadFailed
      ? surveyCopy("问卷数据暂时无法加载。", "The survey data could not be loaded.")
      : surveyCopy("正在加载问卷数据…", "Loading survey data…")}</p>${surveyLoadFailed ? `<button type="button" class="chart-btn" id="retrySurvey">${surveyCopy("重试", "Try again")}</button>` : ""}`;
    document.getElementById("retrySurvey")?.addEventListener("click", loadSurveyData);
    return;
  }
  const group = surveyData.groups.find(entry => entry.id === state.survey);
  const sourceOpen = root.querySelector(".survey-source")?.open || false;
  const viewLabel = surveyCopy(
    { distribution: "回答分布", agreement: "认同比例", table: "表格" }[state.chart],
    { distribution: "Distribution", agreement: "Agreement", table: "Table" }[state.chart]
  );
  const note = state.chart === "distribution"
    ? surveyCopy("每条横条对应一道题，显示有效回答中选择 1–5 分的人数比例。题目旁的文字是题意摘要。", "Each bar shows how valid answers to one question are spread across scores 1–5. The labels are shortened versions of the questions.")
    : state.chart === "agreement"
      ? surveyCopy("认同比例 = 选择 4 或 5 的人数 ÷ 该题有效回答数。题目按问卷模块排列，保留原题的正反方向。", "Agreement is the percentage of valid responses scored 4 or 5. Questions are grouped by questionnaire section, with no reverse scoring.")
      : surveyCopy("每格列出人数和占该题有效回答的比例。屏幕较窄时，可以左右滑动表格。", "Each cell gives the number of responses and their percentage of valid answers to that question. Scroll sideways to see the full table on a small screen.");
  const legend = state.chart !== "agreement" ? `<ul class="survey-legend" aria-label="${surveyCopy("五级量表", "Five-point scale")}">${[1, 2, 3, 4, 5].map(score => `<li><i style="background:var(--score-${score})" aria-hidden="true"></i><span>${score}${score === 1 ? ` · ${t(surveyData.scale.endpoints[1])}` : score === 5 ? ` · ${t(surveyData.scale.endpoints[5])}` : ""}</span></li>`).join("")}</ul>` : "";
  const themes = [...new Set(group.items.map(item => item.theme))];
  const chart = state.chart === "table" ? renderSurveyTable(group) : themes.map(theme => `<section class="survey-dimension" aria-label="${t(surveyThemes[theme])}"><h4>${t(surveyThemes[theme])}</h4>${group.items.filter(item => item.theme === theme).map(renderSurveyRow).join("")}</section>`).join("");
  const invalidItems = group.items.filter(item => item.invalid_n || item.missing_n);
  const invalidNote = invalidItems.map(item => surveyCopy(
    `${item.code}：${item.invalid_n} 个回答的编码不在 1–5 之间${item.missing_n ? `，另有 ${item.missing_n} 个回答缺失` : ""}，已从本题统计中排除。有效回答数 n = ${item.valid_n}。`,
    `${item.code}: ${item.invalid_n} answers with codes outside 1–5${item.missing_n ? ` and ${item.missing_n} missing answers` : ""} were excluded. Valid responses: n = ${item.valid_n}.`
  )).join(" ");
  root.innerHTML = `<p class="survey-view-note">${note}</p>${legend}${chart}
    <p class="survey-footnote">${invalidNote ? `${invalidNote}<br>` : ""}${surveyCopy(`这里选取本组的 ${group.items.length} 道题，反映受访者自己报告的看法。每题单独统计，没有合并成主题总分，结果仅限于本次样本。`, `These ${group.items.length} selected questions reflect what respondents reported in this sample. Each question is summarized separately; answers have not been combined into scores for each theme.`)}</p>
    ${renderSurveySources(group, sourceOpen)}`;
  document.getElementById("surveyStatus").textContent = `${t(group.label)} · ${viewLabel} · ${group.items.length} ${surveyCopy("题", "items")}`;
}

function renderSurveyRow(item) {
  const agreement = state.chart === "agreement";
  const label = `${item.code} ${t(item.label)}`;
  const distributionDescription = [1, 2, 3, 4, 5].map(score => `${score}: ${item.distribution[score]} (${surveyPercent(item.distribution[score] / item.valid_n * 100)})`).join("; ");
  const graphic = agreement
    ? `<div class="survey-agreement" role="img" aria-label="${escapeHtml(`${label}: ${item.agree_n}/${item.valid_n}, ${surveyPercent(item.agree_percent)}`)}"><div class="survey-agreement-track"><div class="survey-agreement-fill" style="width:${item.agree_percent}%"></div></div><div class="survey-axis" aria-hidden="true"><span>0</span><span>50</span><span>100%</span></div></div>`
    : `<div class="survey-bar" role="img" aria-label="${escapeHtml(`${label}. ${distributionDescription}. n=${item.valid_n}`)}">${[1, 2, 3, 4, 5].map(score => {
      const share = item.distribution[score] / item.valid_n * 100;
      return `<span class="survey-segment" style="width:${share}%;background:var(--score-${score})" title="${score}: ${item.distribution[score]} (${surveyPercent(share)})" aria-hidden="true">${share >= 13 ? surveyPercent(share) : ""}</span>`;
    }).join("")}</div>`;
  return `<div class="survey-row"><div class="survey-item-label"><span class="survey-code">${item.code}</span><strong>${escapeHtml(t(item.label))}</strong></div>${graphic}<div class="survey-row-meta">${agreement ? `<strong>${surveyPercent(item.agree_percent)}</strong>` : ""}<span>n = ${item.valid_n}${item.invalid_n ? "*" : ""}</span></div></div>`;
}

function renderSurveyTable(group) {
  return `<div class="data-table survey-table" role="region" tabindex="0" aria-label="${surveyCopy("逐题人数和比例，可横向滚动", "Item counts and shares; scroll horizontally")}"><table><caption>${t(group.label)} · ${surveyCopy("逐题人数 / 比例", "Counts / shares by item")}</caption><thead><tr><th scope="col">${surveyCopy("题目", "Item")}</th>${[1, 2, 3, 4, 5].map(score => `<th scope="col">${score}</th>`).join("")}<th scope="col">${surveyCopy("有效 n", "Valid n")}</th><th scope="col">${surveyCopy("认同比例", "Agreement")}</th><th scope="col">${surveyCopy("均值", "Mean")}</th></tr></thead><tbody>${group.items.map(item => `<tr><th scope="row"><small>${item.code} · ${t(surveyThemes[item.theme])}</small>${escapeHtml(item.question[`text_${state.lang}`])}</th>${[1, 2, 3, 4, 5].map(score => `<td>${item.distribution[score]}<small>${surveyPercent(item.distribution[score] / item.valid_n * 100)}</small></td>`).join("")}<td>${item.valid_n}${item.invalid_n ? "*" : ""}</td><td>${surveyPercent(item.agree_percent)}</td><td>${surveyMean(item.mean)}</td></tr>`).join("")}</tbody></table></div>`;
}

function renderSurveySources(group, open) {
  const auditNotes = surveyData.audit_notes.filter(note => (note.item_id || note.item_ids?.[0] || "").startsWith(group.id));
  return `<details class="survey-source"${open ? " open" : ""}><summary>${surveyCopy("查看题目、来源和计算方法", "Questions, sources and calculations")}</summary><div class="survey-source-body">
    <p>${surveyCopy("数据来源", "Data source")}: ${escapeHtml(group.source.workbook)} · ${group.source.sheet} · ${group.source.response_range}</p>
    <p>${surveyCopy("每题只统计编码为 1–5 整数的回答。认同比例是选择 4 或 5 的人数占有效回答数的比例；均值按原始编码计算，不反向计分，也不加权。商户工作表最后一行是均值，不算一份答卷。百分比经过四舍五入，合计可能不正好是 100%。", "For each question, only whole-number codes from 1 to 5 are counted. Agreement is the share of valid answers scored 4 or 5. Means use the original codes, with no reverse scoring or weighting. The final row of the merchant worksheet is an average, so it is not counted as a response. Rounded percentages may not add up to 100%.")}</p>
    <ol>${group.items.map(item => `<li><strong>${item.code} · ${escapeHtml(item.question[`text_${state.lang}`])}</strong><br>${escapeHtml(item.direction[`higher_score_means_${state.lang}`])}<small>${item.question.wording_status.startsWith("item_summary") ? surveyCopy("这里是题意摘要，现有材料中没有可核对的完整原题。", "This is a summary; the complete original question was not available to check.") : surveyCopy("中文题目来自分析材料，英文为译文。", "The Chinese wording comes from the analysis materials; the English is a translation.")}<br>${escapeHtml(item.question.source_document)}<br>${surveyCopy("数据位置", "Data range")}: ${item.source.sheet} · ${item.source.data_range}</small></li>`).join("")}</ol>
    ${auditNotes.map(note => `<p>${escapeHtml(t(note.text))}</p>`).join("")}
    <a href="data/verified-survey-summary.json" download="verified-survey-summary.json">${surveyCopy("下载问卷汇总数据 ↓", "Download the survey summary ↓")}</a>
    </div></details>`;
}

function activeRegression() {
  return researchData.regressionResults.find(model => model.id === state.regression) || researchData.regressionResults[0];
}

function renderRegression() {
  const tabs = document.getElementById("regressionTabs");
  const summary = document.getElementById("regressionSummary");
  const table = document.getElementById("regressionTable");
  if (!tabs || !summary || !table) return;

  tabs.innerHTML = researchData.regressionResults.map(model => `
    <button class="regression-tab ${model.id === state.regression ? "active" : ""}" type="button" data-model="${model.id}" aria-pressed="${model.id === state.regression}">
      ${t(model.label)}
    </button>
  `).join("");

  const model = activeRegression();
  summary.innerHTML = `
    <div><span>N</span><strong>${model.n}</strong></div>
    <div><span>${state.lang === "zh" ? "样本拟合 R²" : "In-sample R²"}</span><strong>${model.r2.toFixed(3)}</strong></div>
    <p>${t(model.interpretation)}</p>
    <p class="regression-limitation">${state.lang === "zh" ? "这里根据回归工作表做了五变量 OLS 探索性回归。价格评分和选择倾向用到了同一道问卷题，测量内容有重叠，因此系数和 R² 不能作为独立证据，也不能用于判断因果关系。" : "This exploratory OLS model uses five predictors from the regression workbook. The price score and the choice measure share a survey question. Because of this overlap, the coefficients and R² should not be treated as independent evidence or used to draw causal conclusions."}</p>
  `;

  table.innerHTML = `
    <table>
      <caption>${t(model.label)}: ${state.lang === "zh" ? "五变量探索性拟合" : "Exploratory five-predictor fit"}</caption>
      <thead>
        <tr>
          <th scope="col">${state.lang === "zh" ? "变量" : "Variable"}</th>
          <th scope="col">${state.lang === "zh" ? "系数" : "Coefficient"}</th>
        </tr>
      </thead>
      <tbody>
        ${model.variables.map(variable => `
          <tr>
            <td>${state.lang === "zh" ? variable.zh : variable.en}</td>
            <td>${variable.coef.toFixed(3)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  tabs.querySelectorAll(".regression-tab").forEach(button => {
    button.addEventListener("click", () => {
      state.regression = button.dataset.model;
      renderRegression();
      tabs.querySelector(`[data-model="${state.regression}"]`).focus({ preventScroll: true });
    });
  });
}

const themePreference = window.matchMedia("(prefers-color-scheme: dark)");
const mobileNavigation = window.matchMedia("(max-width: 960px)");
let savedTheme = null;
try {
  savedTheme = window.localStorage.getItem("market-research-theme");
} catch {
  // A restricted browser can still switch theme for this visit.
}
state.theme = savedTheme === "dark" || savedTheme === "light"
  ? savedTheme
  : "light";
let lightboxReturnFocus = null;
let previousBodyOverflow = "";

function updateThemeLabel() {
  const button = document.getElementById("themeToggle");
  if (!button) return;
  const dark = state.theme === "dark";
  button.textContent = state.lang === "zh" ? dark ? "浅色" : "深色" : dark ? "Light" : "Dark";
  button.setAttribute("aria-label", state.lang === "zh"
    ? `切换到${dark ? "浅色" : "深色"}模式`
    : `Switch to ${dark ? "light" : "dark"} mode`);
  button.setAttribute("aria-pressed", String(dark));
  button.title = button.getAttribute("aria-label");
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  document.documentElement.style.colorScheme = state.theme;
  updateThemeLabel();
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.content = state.theme === "dark" ? "#141c19" : "#e9dfce";
  document.querySelectorAll('.brand img, .researcher-title > img').forEach(logo => {
    logo.src = state.theme === "dark" ? "assets/market-mark.svg" : "assets/market-mark-forest.svg";
  });
  renderChart();
}

function updateMenuLabel() {
  const button = document.getElementById("menuToggle");
  if (!button) return;
  const open = button.getAttribute("aria-expanded") === "true";
  button.textContent = state.lang === "zh" ? open ? "关闭" : "菜单" : open ? "Close" : "Menu";
  button.setAttribute("aria-label", state.lang === "zh"
    ? `${open ? "关闭" : "打开"}导航菜单`
    : `${open ? "Close" : "Open"} navigation menu`);
}

function setMenuOpen(open, restoreFocus = false) {
  const button = document.getElementById("menuToggle");
  const navigation = document.getElementById("siteNav");
  if (!button || !navigation) return;
  button.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
  navigation.inert = mobileNavigation.matches && !open;
  updateMenuLabel();
  if (restoreFocus) button.focus();
}

document.getElementById("langToggle").addEventListener("click", () => {
  state.lang = state.lang === "zh" ? "en" : "zh";
  applyLanguage();
});

document.getElementById("prevMedia").addEventListener("click", () => cycleMedia(-1));
document.getElementById("nextMedia").addEventListener("click", () => cycleMedia(1));
document.getElementById("closeLightbox").addEventListener("click", () => {
  document.getElementById("lightbox").close();
});
document.getElementById("lightbox").addEventListener("click", event => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});
document.getElementById("lightbox").addEventListener("cancel", event => {
  event.preventDefault();
  event.currentTarget.close();
});
document.getElementById("lightbox").addEventListener("close", () => {
  document.getElementById("lightboxContent").innerHTML = "";
  document.body.style.overflow = previousBodyOverflow;
  if (lightboxReturnFocus?.isConnected) lightboxReturnFocus.focus({ preventScroll: true });
  lightboxReturnFocus = null;
});
document.querySelectorAll("[data-chart]").forEach(button => {
  button.addEventListener("click", () => {
    state.chart = button.dataset.chart;
    renderChart();
  });
});
document.querySelectorAll("[data-survey]").forEach(button => {
  button.addEventListener("click", () => {
    state.survey = button.dataset.survey;
    renderChart();
  });
});

document.getElementById("themeToggle")?.addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  savedTheme = state.theme;
  try {
    window.localStorage.setItem("market-research-theme", state.theme);
  } catch {
    // Keep the current visit functional when browser storage is unavailable.
  }
  applyTheme();
});
themePreference.addEventListener("change", event => {
  if (savedTheme !== "dark" && savedTheme !== "light") {
    state.theme = event.matches ? "dark" : "light";
    applyTheme();
  }
});
document.getElementById("menuToggle")?.addEventListener("click", event => {
  setMenuOpen(event.currentTarget.getAttribute("aria-expanded") !== "true");
});
document.getElementById("siteNav")?.addEventListener("click", event => {
  if (event.target.closest("a")) setMenuOpen(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.getElementById("menuToggle")?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false, true);
  }
});
mobileNavigation.addEventListener("change", () => setMenuOpen(false));
document.querySelectorAll("[data-media-link]").forEach(link => {
  link.addEventListener("click", () => selectMediaGroup(link.dataset.mediaLink));
});

document.querySelectorAll("[data-return-photo]").forEach(button => {
  button.addEventListener("click", () => {
    selectMediaGroup("xinjiang-return", Number(button.dataset.returnPhoto));
    openLightbox(currentMediaGroup().items[state.activeIndex]);
  });
});

setMenuOpen(false);
applyTheme();
applyLanguage();
loadSurveyData();
