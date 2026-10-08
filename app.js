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
      label: { zh: "总样本", en: "Total" },
      n: 90,
      r2: 0.598,
      interpretation: {
        zh: "对 90 份消费者问卷进行五变量探索性拟合，用于观察样本内的变量关联。",
        en: "An exploratory five-predictor fit examines associations within 90 consumer responses."
      },
      variables: [
        reg("delta_score", "价格变化评分", "Delta score", 0.842),
        reg("trust_score", "信任评分", "Trust score", -0.224),
        reg("price_priority", "价格优先度", "Price priority", -0.336),
        reg("space_cost", "空间成本", "Spatial cost", 0.189),
        reg("search_behavior", "搜索行为", "Search behavior", 0.032)
      ]
    },
    {
      id: "elder",
      label: { zh: "年长组", en: "Older Group" },
      n: 75,
      r2: 0.642,
      interpretation: {
        zh: "年长组包含 75 份问卷。分组拟合用于提出后续研究问题，不代表对年龄效应的检验。",
        en: "The older group contains 75 responses. This separate fit suggests questions for further study; it does not test an age effect."
      },
      variables: [
        reg("delta_score", "价格变化评分", "Delta score", 0.925),
        reg("trust_score", "信任评分", "Trust score", -0.202),
        reg("price_priority", "价格优先度", "Price priority", -0.282),
        reg("space_cost", "空间成本", "Spatial cost", 0.171),
        reg("search_behavior", "搜索行为", "Search behavior", 0.035)
      ]
    },
    {
      id: "young",
      label: { zh: "年轻组", en: "Younger Group" },
      n: 15,
      r2: 0.482,
      interpretation: {
        zh: "年轻组仅有 15 份问卷，估计容易受个别回答影响，不能据此推广到年轻消费者。",
        en: "With only 15 responses, the younger-group estimates are sensitive to individual answers and cannot be generalized to younger consumers."
      },
      variables: [
        reg("delta_score", "价格变化评分", "Delta score", 0.552),
        reg("trust_score", "信任评分", "Trust score", -0.569),
        reg("price_priority", "价格优先度", "Price priority", -0.590),
        reg("space_cost", "空间成本", "Spatial cost", 0.154),
        reg("search_behavior", "搜索行为", "Search behavior", 0.126)
      ]
    },
    {
      id: "lowedu",
      label: { zh: "低教育组", en: "Lower Education" },
      n: 59,
      r2: 0.699,
      interpretation: {
        zh: "较低教育组包含 59 份问卷。系数描述这一子样本内的关联，不用于判断教育程度的因果作用。",
        en: "The lower-education group contains 59 responses. Its coefficients describe within-group associations, not causal effects of education."
      },
      variables: [
        reg("delta_score", "价格变化评分", "Delta score", 1.113),
        reg("trust_score", "信任评分", "Trust score", -0.412),
        reg("price_priority", "价格优先度", "Price priority", -0.201),
        reg("space_cost", "空间成本", "Spatial cost", 0.015),
        reg("search_behavior", "搜索行为", "Search behavior", 0.130)
      ]
    },
    {
      id: "highedu",
      label: { zh: "高教育组", en: "Higher Education" },
      n: 31,
      r2: 0.630,
      interpretation: {
        zh: "较高教育组包含 31 份问卷。与其他组的差异仅作为探索线索，尚未进行正式的组间差异检验。",
        en: "The higher-education group contains 31 responses. Differences from other groups remain exploratory; no formal between-group test is reported."
      },
      variables: [
        reg("delta_score", "价格变化评分", "Delta score", 0.783),
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
    title: { zh: "模块A：消费者行为", en: "Module A: Consumer Behavior" },
    articles: [
      {
        tag: { zh: "消费者", en: "Consumer" },
        title: { zh: "价格敏感度", en: "Price Sensitivity" },
        summary: {
          zh: "问卷回答显示，受访者对摊贩低价和临时降价有较高认同。",
          en: "Survey responses show agreement with choosing lower-priced vendors and reconsidering a purchase after a price cut."
        },
        detail: {
          zh: "问卷分别询问了摊贩比商超便宜时的选择，以及摊位突然降价时是否改变计划。这些自述回答为理解价格比较提供了线索，不能直接等同于实际购买行为。",
          en: "The questionnaire separately asks about choosing cheaper vendors over supermarkets and changing plans after a price cut. These self-reported responses offer clues about price comparison; they do not directly measure purchases."
        },
        media: "xinjiang-bazaar"
      },
      {
        tag: { zh: "消费者", en: "Consumer" },
        title: { zh: "信任与服务偏好", en: "Trust & Service Preference" },
        summary: {
          zh: "部分受访者认可熟悉摊贩和良好服务，并表达接受略高价格的意愿。",
          en: "Some respondents value familiar vendors and good service and report a willingness to accept slightly higher prices."
        },
        detail: {
          zh: "熟悉关系与服务体验是问卷中的独立观察维度。它们提示我们继续研究：顾客如何在价格、商品可靠性和与摊主的关系之间作出权衡。",
          en: "Familiarity and service experience are distinct dimensions in the questionnaire. They invite further study of how customers weigh price, product reliability, and relationships with vendors."
        },
        media: "xinjiang-questionnaire"
      },
      {
        tag: { zh: "消费者", en: "Consumer" },
        title: { zh: "空间选择与比较", en: "Spatial Choice & Search" },
        summary: {
          zh: "受访者较为认同比较不同摊位后再购买。",
          en: "Respondents tend to agree with comparing several stalls before purchasing."
        },
        detail: {
          zh: "问卷将入口便利、为低价多走路和比较多家摊位分开提问。这些回答支持把空间与搜索作为研究维度，但尚不足以判断空间成本是否被其他体验抵消。",
          en: "The questionnaire treats entrance convenience, walking farther for a lower price, and comparing stalls as separate questions. These responses support studying space and search, without establishing whether other experiences offset spatial costs."
        },
        media: "suzhou"
      }
    ]
  },
  {
    title: { zh: "模块B：商户策略", en: "Module B: Merchant Strategies" },
    articles: [
      {
        tag: { zh: "商户", en: "Merchant" },
        title: { zh: "价格灵活性", en: "Price Flexibility" },
        summary: {
          zh: "商户问卷呈现出关注同行价格和调整价格的倾向。",
          en: "Merchant responses indicate attention to competitors’ prices and a tendency to adjust their own prices."
        },
        detail: {
          zh: "问卷关注商户对价格变化的反应、跟随降价的倾向，以及坚持既定价格的程度。这些回答描述了受访商户的定价态度，尚未直接测量策略带来的利润。",
          en: "The questionnaire asks about responses to price changes, following price cuts, and maintaining an existing price. These responses describe pricing attitudes; they do not directly measure the profits from a strategy."
        },
        media: "xinjiang-producer"
      },
      {
        tag: { zh: "商户", en: "Merchant" },
        title: { zh: "空间敏感性 & 摊位布局", en: "Spatial Sensitivity & Location" },
        summary: {
          zh: "商户问卷对摊位位置和空间竞争表现出较高关注。",
          en: "Merchant responses show considerable attention to stall location and competition for space."
        },
        detail: {
          zh: "商户对位置与销量的关系、空间竞争和角落位置的潜在劣势表达了看法。这里呈现的是经营者的感知，不能据此推断具体位置带来的销售或利润变化。",
          en: "Merchants report their views on location and sales, spatial competition, and possible disadvantages of a corner stall. These are operators’ perceptions, not measured changes in sales or profit caused by location."
        },
        media: "chongqing"
      },
      {
        tag: { zh: "综合机制", en: "Integrated Mechanism" },
        title: { zh: "多维竞争机制", en: "Multidimensional Competition" },
        summary: {
          zh: "项目以价格、信任与空间三个维度理解市集中的选择。",
          en: "The project examines market choices through three dimensions: price, trust, and space."
        },
        detail: {
          zh: "价格比较、熟悉关系和摊位搜索为观察市集提供了相互关联的视角。项目结合问卷与影像提出这些研究问题，后续仍需更清晰的测量设计和更多样本来检验机制。",
          en: "Price comparison, familiar relationships, and stall search offer connected perspectives on markets. The project uses questionnaires and images to frame these questions; clearer measurement and further samples are needed to test the mechanisms."
        },
        media: "xinjiang-bazaar"
      }
    ]
  }
];

const mediaGroups = [
  {
    id: "xinjiang-bazaar",
    title: { zh: "新疆市集总览", en: "Xinjiang Bazaar Overview" },
    article: { zh: "关联：价格敏感度 / 多维竞争机制", en: "Linked: Price Sensitivity / Multidimensional Competition" },
    items: ["bazzar-1.jpg", "bazzar-2.jpg", "bazzar-3.jpg", "bazzar-4.jpg", "bazzar-5.jpg"].map(file => item(`xinjiangbazaar/${file}`, "image"))
  },
  {
    id: "xinjiang-producer",
    title: { zh: "新疆生产者", en: "Xinjiang Producers" },
    article: { zh: "关联：价格灵活性", en: "Linked: Price Flexibility" },
    items: ["people-producer.jpg", "people-producer-8.jpg", "people-producer-7.jpg", "people-producer-6.jpg", "people-producer-5.jpg", "People-producer-4.jpg", "People-Producer-3.jpg", "People-producer-2.jpg"].map(file => item(`xinjiangbazaar/${file}`, "image"))
  },
  {
    id: "xinjiang-questionnaire",
    title: { zh: "新疆问卷现场", en: "Xinjiang Questionnaire Fieldwork" },
    article: { zh: "关联：信任与服务偏好", en: "Linked: Trust & Service Preference" },
    items: ["People-questionnaire-1.jpg", "people-questionnaire-2.jpg", "People-questionnaire-3.jpg", "people-questionnaire-4.jpg", "people-questonnaire-5.jpg", "people-questionnaire-6.jpg"].map(file => item(`xinjiangbazaar/${file}`, "image"))
  },
  {
    id: "suzhou",
    title: { zh: "苏州市集", en: "Suzhou Markets" },
    article: { zh: "关联：空间选择与比较", en: "Linked: Spatial Choice & Search" },
    items: Array.from({ length: 10 }, (_, i) => item(`suzhou/suzhou-${i + 1}.jpg`, "image"))
  },
  {
    id: "chongqing",
    title: { zh: "重庆市集", en: "Chongqing Markets" },
    article: { zh: "关联：空间敏感性 & 摊位布局", en: "Linked: Spatial Sensitivity & Location" },
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
  document.getElementById("prevMedia").setAttribute("aria-label", state.lang === "zh" ? "上一张影像" : "Previous image");
  document.getElementById("nextMedia").setAttribute("aria-label", state.lang === "zh" ? "下一张影像" : "Next image");
  document.getElementById("closeLightbox").setAttribute("aria-label", state.lang === "zh" ? "关闭影像预览" : "Close image preview");
  document.getElementById("lightbox").setAttribute("aria-label", state.lang === "zh" ? "影像预览" : "Image preview");
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
            <a class="article-toggle jump-media" href="#media" data-media="${article.media}">${state.lang === "zh" ? "查看关联影像" : "View Linked Media"}</a>
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
  if (state.lang === "zh") return expanded ? "收起文章" : "展开文章";
  return expanded ? "Read Less" : "Read More";
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

function selectMediaGroup(id) {
  if (!mediaGroups.some(group => group.id === id)) return;
  state.activeMedia = id;
  state.activeIndex = 0;
  renderMediaTabs();
  renderFeaturedMedia();
  renderMediaGrid();
}

function mediaElement(media, alt, interactive = false) {
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
      <span>${t(group.article)}</span>
      <span class="media-count">${String(state.activeIndex + 1).padStart(2, "0")} / ${String(group.items.length).padStart(2, "0")}</span>
    </div>
  `;
  const status = document.getElementById("mediaStatus");
  if (status) status.textContent = state.lang === "zh"
    ? `${t(group.title)}，第 ${state.activeIndex + 1} 张，共 ${group.items.length} 张`
    : `${t(group.title)}, image ${state.activeIndex + 1} of ${group.items.length}`;
}

function renderMediaGrid() {
  const group = currentMediaGroup();
  const root = document.getElementById("mediaGrid");
  root.innerHTML = group.items.map((media, index) => `
    <button class="media-card" type="button" data-index="${index}" aria-label="${escapeHtml(t(group.title))} · ${index + 1}${state.lang === "zh" ? "，打开影像" : ", open image"}">
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
  content.innerHTML = mediaElement(media, `${t(group.title)} · ${state.activeIndex + 1}`, true);
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
    const response = await fetch("data/verified-survey-summary.json");
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
      ? surveyCopy("问卷汇总暂未载入。", "The questionnaire summary could not be loaded.")
      : surveyCopy("正在载入问卷汇总…", "Loading questionnaire summaries…")}</p>${surveyLoadFailed ? `<button type="button" class="chart-btn" id="retrySurvey">${surveyCopy("重新载入", "Try again")}</button>` : ""}`;
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
    ? surveyCopy("每条代表一道题，展示有效回答在 1–5 分之间的分布。图上标题为题意摘要。", "Each bar shows one item's valid responses on the 1–5 scale. Chart titles summarize the items.")
    : state.chart === "agreement"
      ? surveyCopy("认同比例 = 选择 4 或 5 的人数 ÷ 该题有效回答数。保留原题方向，按问卷模块排列。", "Agreement = responses of 4 or 5 divided by valid responses for that item. Original directions and questionnaire modules are retained.")
      : surveyCopy("每格显示人数与占该题有效回答的比例。窄屏可横向滑动表格。", "Each cell shows a count and its share of valid responses. Scroll the table horizontally on narrow screens.");
  const legend = state.chart !== "agreement" ? `<ul class="survey-legend" aria-label="${surveyCopy("五级量表", "Five-point scale")}">${[1, 2, 3, 4, 5].map(score => `<li><i style="background:var(--score-${score})" aria-hidden="true"></i><span>${score}${score === 1 ? ` · ${t(surveyData.scale.endpoints[1])}` : score === 5 ? ` · ${t(surveyData.scale.endpoints[5])}` : ""}</span></li>`).join("")}</ul>` : "";
  const themes = [...new Set(group.items.map(item => item.theme))];
  const chart = state.chart === "table" ? renderSurveyTable(group) : themes.map(theme => `<section class="survey-dimension" aria-label="${t(surveyThemes[theme])}"><h4>${t(surveyThemes[theme])}</h4>${group.items.filter(item => item.theme === theme).map(renderSurveyRow).join("")}</section>`).join("");
  const invalidItems = group.items.filter(item => item.invalid_n || item.missing_n);
  const invalidNote = invalidItems.map(item => surveyCopy(
    `${item.code}：${item.invalid_n} 条编码超出 1–5 范围${item.missing_n ? `，${item.missing_n} 条缺失` : ""}，不计入此题比例；有效 n = ${item.valid_n}。`,
    `${item.code}: ${item.invalid_n} out-of-range code(s)${item.missing_n ? ` and ${item.missing_n} missing response(s)` : ""} excluded from this item; valid n = ${item.valid_n}.`
  )).join(" ");
  root.innerHTML = `<p class="survey-view-note">${note}</p>${legend}${chart}
    <p class="survey-footnote">${invalidNote ? `${invalidNote}<br>` : ""}${surveyCopy(`本组展示 ${group.items.length} 道选定题。均为样本内自陈回答，各题独立统计；不合成为维度分数。`, `${group.items.length} selected items from this group. These are self-reported answers within the sample; items are summarized separately, without composite dimension scores.`)}</p>
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
  return `<details class="survey-source"${open ? " open" : ""}><summary>${surveyCopy("题目、来源与计算说明", "Items, sources & calculation notes")}</summary><div class="survey-source-body">
    <p>${surveyCopy("数据来源", "Data source")}: ${escapeHtml(group.source.workbook)} · ${group.source.sheet} · ${group.source.response_range}</p>
    <p>${surveyCopy("每题仅纳入 1–5 的整数编码。认同比例为 4、5 两档合计除以有效回答数；均值按原始编码计算。未反向计分，未加权。商户表末尾均值行不计为答卷。百分比四舍五入后相加可能不等于 100%。", "Only integer codes from 1 to 5 are included per item. Agreement combines scores 4 and 5; means use the original codes. No reverse coding or weighting is applied. The merchant worksheet's final average row is excluded. Rounded percentages may not sum to 100%.")}</p>
    <ol>${group.items.map(item => `<li><strong>${item.code} · ${escapeHtml(item.question[`text_${state.lang}`])}</strong><br>${escapeHtml(item.direction[`higher_score_means_${state.lang}`])}<small>${item.question.wording_status.startsWith("item_summary") ? surveyCopy("题意摘要；材料未提供可核对的完整原题。", "Item summary; complete original wording was not available for verification.") : surveyCopy("中文陈述见分析材料；英文为译文。", "Chinese statement from the analysis materials; English is a translation.")}<br>${escapeHtml(item.question.source_document)}<br>${surveyCopy("数据位置", "Data range")}: ${item.source.sheet} · ${item.source.data_range}</small></li>`).join("")}</ol>
    ${auditNotes.map(note => `<p>${escapeHtml(t(note.text))}</p>`).join("")}
    <a href="data/verified-survey-summary.json" download="verified-survey-summary.json">${surveyCopy("下载问卷汇总数据 ↓", "Download aggregate data ↓")}</a>
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
    <p class="regression-limitation">${state.lang === "zh" ? "方法说明：依据现有回归数据表，以五个变量进行探索性 OLS 拟合。价格评分与选择倾向包含同一道问卷题，存在测量重叠；系数与 R² 不应解释为独立或因果证据。" : "Method: exploratory OLS with five predictors, derived from the supplied regression workbook. The price score and choice outcome share a questionnaire item; coefficients and R² are not independent or causal evidence."}</p>
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
  if (themeMeta) themeMeta.content = "#141c19";
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

setMenuOpen(false);
applyTheme();
applyLanguage();
loadSurveyData();
