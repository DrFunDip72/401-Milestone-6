export interface Article {
  id: string;
  source: string;
  headline: string;
  summary: string;
  imageUrl: string;
  biasScore: number;
  biasLabel: string;
  publishedAt: string;
  content: string;
  sourceUrl: string;
}

export interface Topic {
  id: string;
  title: string;
  imageUrl: string;
  aiSummary: string;
  sharedFacts: string[];
  divergentNarratives: string[];
  articleCount: number;
  articles: Article[];
}

export const UTAH_COUNTIES = [
  "Beaver",
  "Box Elder",
  "Cache",
  "Carbon",
  "Daggett",
  "Davis",
  "Duchesne",
  "Emery",
  "Garfield",
  "Grand",
  "Iron",
  "Juab",
  "Kane",
  "Millard",
  "Morgan",
  "Piute",
  "Rich",
  "Salt Lake",
  "San Juan",
  "Sanpete",
  "Sevier",
  "Summit",
  "Tooele",
  "Uintah",
  "Utah",
  "Wasatch",
  "Washington",
  "Wayne",
  "Weber",
];

const SOURCES = ["Salt Lake Tribune", "Deseret News", "KSL", "Utah Policy"];

function createArticle(
  id: string,
  source: string,
  headline: string,
  summary: string,
  imageUrl: string,
  content: string,
  sourceUrl: string,
  publishedAt: string,
  biasScore: number,
  biasLabel: string
): Article {
  return {
    id,
    source,
    headline,
    summary,
    imageUrl,
    biasScore,
    biasLabel,
    publishedAt,
    content,
    sourceUrl,
  };
}

export const TOPICS: Topic[] = [
  {
    id: "utah-housing-crisis",
    title: "Utah Housing Crisis",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    aiSummary:
      "Utah faces a severe housing affordability crisis as prices have surged dramatically over the past five years. Median home prices in Salt Lake County now exceed $550,000, while wages have not kept pace. The state legislature has debated various solutions including zoning reforms, affordable housing incentives, and first-time buyer programs.",
    sharedFacts: [
      "Median home prices in Salt Lake County exceed $550,000 as of 2024",
      "Utah's population grew by 18% between 2010 and 2020",
      "The state has fewer than 30 affordable units per 100 extremely low-income renters",
      "Housing costs have increased over 60% in the past five years across major Utah metros",
    ],
    divergentNarratives: [
      "Whether government intervention through zoning reform is the primary solution vs. market-driven supply increases",
      "The extent to which out-of-state buyers and institutional investors are driving price increases",
      "Whether rent control would help or harm Utah's housing market",
      "The role of single-family zoning in perpetuating the affordability gap",
    ],
    articleCount: 4,
    articles: [
      createArticle(
        "hc-1",
        SOURCES[0],
        "Utah Housing Prices Hit Record Highs as Affordability Crisis Deepens",
        "Salt Lake County median home prices surpassed $550,000 as families struggle to find affordable housing. Experts point to limited supply and high demand.",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        "Utah's housing market continues to break records, with median home prices in Salt Lake County now exceeding $550,000. Housing advocates say the situation has reached crisis levels, with many working families priced out of the market entirely. The state has seen a 60% increase in housing costs over the past five years while wages have grown at a much slower pace.",
        "https://example.com/slt-housing",
        "2024-02-08",
        0.3,
        "left"
      ),
      createArticle(
        "hc-2",
        SOURCES[1],
        "State Legislature Considers Zoning Reforms to Address Housing Shortage",
        "Lawmakers are weighing proposals to allow more density and streamline permitting to increase housing supply across Utah.",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        "The Utah Legislature is considering a package of zoning reforms aimed at increasing housing supply. Proposals include allowing accessory dwelling units by right, reducing parking minimums, and streamlining the permitting process. Supporters argue that increasing supply is the key to affordability, while some municipalities have expressed concerns about local control.",
        "https://example.com/deseret-zoning",
        "2024-02-07",
        -0.2,
        "right"
      ),
      createArticle(
        "hc-3",
        SOURCES[2],
        "First-Time Buyer Programs See Record Demand in Utah",
        "State and federal first-time homebuyer assistance programs are overwhelmed with applications as Utahns seek relief from high prices.",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
        "First-time homebuyer programs offered by the state and federal government are seeing unprecedented demand. The Utah Housing Corporation reports that their down payment assistance program received three times more applications than available funding in the last cycle. Many applicants report being outbid by cash buyers in the competitive market.",
        "https://example.com/ksl-buyers",
        "2024-02-06",
        0,
        "center"
      ),
      createArticle(
        "hc-4",
        SOURCES[3],
        "Housing Policy Experts Debate Best Path Forward for Utah",
        "A panel of economists and policy experts offered differing views on how to address Utah's housing affordability challenge.",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
        "Policy experts convened at a Utah think tank forum offered divergent views on housing solutions. Some advocated for aggressive zoning reform while others cautioned that rapid changes could have unintended consequences. There was broad agreement that the problem is serious but little consensus on the best approach.",
        "https://example.com/utahpolicy-forum",
        "2024-02-05",
        0,
        "center"
      ),
    ],
  },
  {
    id: "great-salt-lake",
    title: "Great Salt Lake Water Levels",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    aiSummary:
      "The Great Salt Lake has reached critically low levels, threatening water supplies, wildlife habitat, and air quality. Dust from the exposed lakebed could worsen the Wasatch Front's already significant air pollution. Agricultural water use and climate change are cited as major factors.",
    sharedFacts: [
      "The Great Salt Lake has lost over 70% of its water volume since 1850",
      "The lake's bed contains arsenic and other harmful minerals that could become airborne",
      "Utah lawmakers allocated $40 million for lake restoration in 2023",
      "Agricultural water use accounts for approximately 75% of water consumption in the Great Salt Lake watershed",
    ],
    divergentNarratives: [
      "The urgency of mandatory water use restrictions vs. voluntary conservation measures",
      "Whether agricultural water rights should be prioritized over urban and environmental needs",
      "The feasibility of pipeline projects to bring water to the lake",
      "How much climate change vs. human consumption is responsible for the decline",
    ],
    articleCount: 4,
    articles: [
      createArticle(
        "gsl-1",
        SOURCES[0],
        "Great Salt Lake Hits Historic Low as Scientists Warn of Dust Disaster",
        "Researchers say the exposed lakebed could release toxic dust into the Wasatch Front, creating a public health emergency.",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "The Great Salt Lake has reached its lowest level in recorded history, raising alarms among scientists about potential dust storms from the exposed lakebed. The dry lakebed contains arsenic and other heavy metals that could become airborne, threatening the health of millions of Utahns living along the Wasatch Front.",
        "https://example.com/slt-gsl",
        "2024-02-09",
        0.2,
        "left"
      ),
      createArticle(
        "gsl-2",
        SOURCES[1],
        "State Launches New Conservation Initiative for Great Salt Lake",
        "Utah officials announce voluntary water-saving programs and incentives for farmers to reduce consumption.",
        "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800",
        "State leaders unveiled a new conservation initiative aimed at protecting the Great Salt Lake. The program includes incentives for farmers to adopt more efficient irrigation practices and voluntary water-saving targets for municipalities. Officials emphasized collaboration with agricultural stakeholders.",
        "https://example.com/deseret-conservation",
        "2024-02-08",
        -0.3,
        "right"
      ),
      createArticle(
        "gsl-3",
        SOURCES[2],
        "Lawmakers Consider $500M Pipeline to Save Great Salt Lake",
        "A proposed pipeline from the Pacific Ocean is among options being studied to replenish the shrinking lake.",
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
        "Utah legislators are studying a controversial proposal to build a pipeline to bring water from the Pacific Ocean to the Great Salt Lake. Supporters say it could be a long-term solution, while critics argue the project would be prohibitively expensive and environmentally damaging. The state has allocated funds for feasibility studies.",
        "https://example.com/ksl-pipeline",
        "2024-02-07",
        0,
        "center"
      ),
      createArticle(
        "gsl-4",
        SOURCES[3],
        "Great Salt Lake Debate: Balancing Agriculture, Growth, and Environment",
        "Policymakers face difficult choices as they work to address the lake's decline without harming Utah's economy.",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        "The decline of the Great Salt Lake presents policymakers with a complex set of trade-offs. Agriculture, Utah's second-largest industry, depends on the same water sources feeding the lake. Urban growth continues to increase demand. Environmental advocates push for urgent action while others emphasize the need for balanced solutions.",
        "https://example.com/utahpolicy-balance",
        "2024-02-06",
        0,
        "center"
      ),
    ],
  },
  {
    id: "utah-education-funding",
    title: "Utah Education Funding",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    aiSummary:
      "Utah consistently ranks last in the nation for per-pupil education spending while maintaining relatively strong student outcomes. The legislature has debated teacher pay raises, school choice initiatives, and how to allocate a substantial budget surplus.",
    sharedFacts: [
      "Utah spends approximately $10,000 per pupil, the lowest in the nation",
      "Utah has the largest average class sizes in the country",
      "Teacher salaries in Utah lag behind the national average by roughly $10,000",
      "The state education fund had a significant surplus heading into the 2024 legislative session",
    ],
    divergentNarratives: [
      "Whether additional funding would meaningfully improve outcomes given Utah's current ranking in test scores",
      "The merits of school choice and voucher programs vs. traditional public school investment",
      "Whether teacher pay increases should be the priority over reducing class sizes",
      "How much of the surplus should go to education vs. tax cuts",
    ],
    articleCount: 4,
    articles: [
      createArticle(
        "ed-1",
        SOURCES[0],
        "Utah Teachers Push for Pay Raise as State Sits on Education Surplus",
        "Educators argue the legislature has the funds to address the state's teacher shortage and salary gap.",
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
        "Utah teachers and their unions are calling for significant pay increases as the state manages a substantial education fund surplus. Utah ranks last in per-pupil spending and teacher salaries lag the national average by about $10,000. Supporters say investment in teachers is essential to address staffing shortages.",
        "https://example.com/slt-teachers",
        "2024-02-08",
        0.3,
        "left"
      ),
      createArticle(
        "ed-2",
        SOURCES[1],
        "Legislature Approves School Choice Expansion Alongside Funding Increase",
        "Lawmakers pass a package that includes both teacher pay raises and expanded options for families.",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
        "The Utah Legislature passed a comprehensive education bill that includes teacher pay increases and expansion of school choice programs. Supporters say the dual approach gives families more options while also supporting traditional public schools. The bill received bipartisan support.",
        "https://example.com/deseret-choice",
        "2024-02-07",
        -0.2,
        "right"
      ),
      createArticle(
        "ed-3",
        SOURCES[2],
        "Utah Schools Struggle with Teacher Shortage Despite Competitive Hiring",
        "Districts report difficulties filling positions as educators seek better pay in neighboring states.",
        "https://images.unsplash.com/photo-1580582932707-4a4a2ffd7e5d?w=800",
        "Utah school districts continue to struggle with teacher recruitment and retention. Many educators report leaving for neighboring states that offer higher salaries. Districts have implemented signing bonuses and other incentives, but vacancies persist, particularly in rural areas and specialized subjects.",
        "https://example.com/ksl-shortage",
        "2024-02-06",
        0,
        "center"
      ),
      createArticle(
        "ed-4",
        SOURCES[3],
        "Education Funding Forum: Utah's Unique Position in National Rankings",
        "Experts discuss why Utah achieves strong outcomes despite minimal spending and what that means for policy.",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
        "Policy analysts gathered to discuss Utah's education paradox: the state ranks last in per-pupil spending but achieves above-average outcomes on several national metrics. Some attribute this to Utah's culture of education and family involvement, while others argue that additional investment could yield even better results.",
        "https://example.com/utahpolicy-forum",
        "2024-02-05",
        0,
        "center"
      ),
    ],
  },
  {
    id: "wasatch-air-quality",
    title: "Air Quality Along the Wasatch Front",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
    aiSummary:
      "The Wasatch Front continues to experience some of the worst winter air quality in the nation due to inversions that trap pollution in the valley. Vehicles, industry, and residential burning all contribute. The state has implemented various programs to improve air quality.",
    sharedFacts: [
      "The Wasatch Front frequently ranks among the worst in the nation for winter PM2.5 pollution",
      "Temperature inversions trap pollution in the valley for days or weeks during winter",
      "Vehicles account for roughly 50% of winter pollution along the Wasatch Front",
      "Utah has implemented wood-burning restrictions and Tier 3 fuel requirements",
    ],
    divergentNarratives: [
      "The balance between economic growth and stricter emissions regulations",
      "Whether free transit should be expanded during inversion periods",
      "The role of wood-burning stoves vs. vehicle emissions in winter pollution",
      "How aggressively the state should pursue electric vehicle incentives",
    ],
    articleCount: 4,
    articles: [
      createArticle(
        "aq-1",
        SOURCES[0],
        "Inversion Season Returns as Wasatch Front Braces for Another Bad Air Winter",
        "Health officials warn residents to limit outdoor activity as pollution levels spike.",
        "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800",
        "Another inversion season has settled over the Wasatch Front, bringing dangerous levels of PM2.5 pollution. Health officials are urging residents, especially those with respiratory conditions, to limit outdoor activity. Schools have canceled recess, and some employers are allowing remote work on red air days.",
        "https://example.com/slt-inversion",
        "2024-02-09",
        0.2,
        "left"
      ),
      createArticle(
        "aq-2",
        SOURCES[1],
        "State Expands Incentives for Electric Vehicles and Clean Heating",
        "New rebate programs aim to reduce emissions from vehicles and home heating.",
        "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92a?w=800",
        "Utah has expanded incentives for electric vehicles and clean heating alternatives. The programs include rebates for EV purchases and grants to help homeowners replace wood-burning stoves with cleaner options. Officials say the voluntary approach will help improve air quality without mandates.",
        "https://example.com/deseret-ev",
        "2024-02-08",
        -0.2,
        "right"
      ),
      createArticle(
        "aq-3",
        SOURCES[2],
        "Free Transit Days See Record Ridership During Inversion",
        "UTA reports strong participation in program aimed at reducing vehicle emissions on bad air days.",
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
        "Utah Transit Authority's free transit program during inversion days has seen record ridership this winter. UTA and state officials are considering expanding the program, which waives fares on red air days to encourage residents to leave their cars at home. Traffic data suggests some reduction in vehicle trips.",
        "https://example.com/ksl-transit",
        "2024-02-07",
        0,
        "center"
      ),
      createArticle(
        "aq-4",
        SOURCES[3],
        "Air Quality Report: Progress Made But Challenges Remain",
        "Annual assessment shows improving trends in some pollutants while winter inversions persist.",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
        "The annual air quality report from state environmental officials shows mixed results. Summer ozone levels have improved with Tier 3 fuels, and industrial emissions have decreased. However, winter PM2.5 pollution remains stubbornly high due to the unique geography of the Wasatch Front and continued growth.",
        "https://example.com/utahpolicy-report",
        "2024-02-06",
        0,
        "center"
      ),
    ],
  },
  {
    id: "utah-tech-growth",
    title: "Utah Tech Industry Growth",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    aiSummary:
      "Utah's tech sector has grown rapidly, earning the state the nickname 'Silicon Slopes.' Major companies have expanded operations, creating jobs and driving economic growth. The expansion has also raised concerns about housing, traffic, and maintaining Utah's quality of life.",
    sharedFacts: [
      "Utah's tech sector employs over 100,000 workers and contributes billions to the economy",
      "Silicon Slopes has attracted major companies including Adobe, Qualtrics, and Pluralsight",
      "Tech job growth in Utah has outpaced the national average for five consecutive years",
      "The state offers tax incentives and workforce development programs to attract tech companies",
    ],
    divergentNarratives: [
      "Whether tax incentives for tech companies provide sufficient return on investment",
      "The impact of tech growth on housing prices and displacement of long-term residents",
      "How to balance economic development with infrastructure and quality of life",
      "Whether Utah should prioritize tech over other industries like manufacturing",
    ],
    articleCount: 4,
    articles: [
      createArticle(
        "tech-1",
        SOURCES[0],
        "Tech Boom Transforms Utah Economy But Raises Gentrification Concerns",
        "Rapid growth in Silicon Slopes has brought prosperity and concerns about housing displacement.",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
        "Utah's tech boom has transformed the state's economy, creating thousands of high-paying jobs. But the growth has also contributed to soaring housing prices and concerns about gentrification. Some long-term residents say they feel priced out of communities they've called home for decades.",
        "https://example.com/slt-tech",
        "2024-02-08",
        0.3,
        "left"
      ),
      createArticle(
        "tech-2",
        SOURCES[1],
        "New Tech Campus Announcements Signal Continued Growth for Silicon Slopes",
        "Major companies announce expansions as Utah doubles down on tech-friendly policies.",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
        "Two major tech companies announced plans to expand their Utah operations, bringing thousands of additional jobs to Silicon Slopes. State officials cheered the announcements as validation of Utah's business-friendly approach. The expansions include new campuses and commitments to workforce development partnerships.",
        "https://example.com/deseret-tech",
        "2024-02-07",
        -0.2,
        "right"
      ),
      createArticle(
        "tech-3",
        SOURCES[2],
        "Utah Universities Expand Tech Programs to Meet Workforce Demand",
        "Colleges and coding bootcamps are racing to produce enough graduates for growing tech sector.",
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
        "Utah's universities and coding bootcamps are expanding their tech programs to meet the growing demand for workers. The University of Utah and BYU have added computer science capacity, while private bootcamps have proliferated. Employers say they still struggle to find enough qualified candidates.",
        "https://example.com/ksl-universities",
        "2024-02-06",
        0,
        "center"
      ),
      createArticle(
        "tech-4",
        SOURCES[3],
        "Silicon Slopes: Assessing Utah's Tech Success and Future Challenges",
        "Economists weigh the benefits of tech growth against infrastructure and housing pressures.",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        "A panel of economists assessed Utah's tech sector growth and its implications. There was broad agreement that the industry has been a major economic driver. The discussion focused on how to sustain growth while addressing housing affordability, traffic congestion, and ensuring that benefits are widely shared.",
        "https://example.com/utahpolicy-tech",
        "2024-02-05",
        0,
        "center"
      ),
    ],
  },
  {
    id: "public-lands-debate",
    title: "Public Lands Debate",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
    aiSummary:
      "Utah has been at the center of the national debate over federal public lands. The state has challenged federal management and sought to transfer lands to state control. Conservation groups, recreation advocates, and extractive industries all have strong interests in the outcome.",
    sharedFacts: [
      "The federal government manages approximately 66% of Utah's land",
      "Utah passed a law in 2012 demanding the federal government transfer public lands to the state",
      "Utah's public lands support recreation, grazing, mining, and oil and gas development",
      "Bear's Ears and Grand Staircase-Escalante national monuments have been subject to boundary changes",
    ],
    divergentNarratives: [
      "Whether federal or state management better serves Utah's interests",
      "The appropriate balance between conservation, recreation, and extractive uses",
      "The validity of national monument designations and presidential authority to modify them",
      "Whether transfer of public lands would benefit or harm Utah's economy",
    ],
    articleCount: 4,
    articles: [
      createArticle(
        "pl-1",
        SOURCES[0],
        "Conservation Groups Sue Over Public Lands Management Changes",
        "Environmental advocates challenge federal decisions that would open more land to development.",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
        "Conservation organizations have filed suit challenging recent changes to public lands management in Utah. The lawsuits target decisions that would open additional areas to oil and gas leasing and off-road vehicle use. Plaintiffs argue the changes violate environmental laws and fail to consider impacts on wildlife and recreation.",
        "https://example.com/slt-conservation",
        "2024-02-09",
        0.3,
        "left"
      ),
      createArticle(
        "pl-2",
        SOURCES[1],
        "Utah Continues Push for State Management of Public Lands",
        "Legislators argue that Utah would be better stewards of lands within its borders.",
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
        "Utah lawmakers are continuing their push for greater state control over public lands. They argue that state management would be more responsive to local needs and Utah's unique conditions. The state has allocated funds for legal challenges and studies of potential land transfer scenarios.",
        "https://example.com/deseret-lands",
        "2024-02-08",
        -0.3,
        "right"
      ),
      createArticle(
        "pl-3",
        SOURCES[2],
        "Recreation Industry Urges Balanced Approach to Public Lands",
        "Outdoor industry representatives say access and conservation can coexist.",
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
        "Representatives of Utah's growing outdoor recreation industry are calling for a balanced approach to public lands. They note that recreation contributes billions to the state economy and depends on conserved landscapes. Industry leaders hope to find common ground between conservation advocates and those favoring multiple use.",
        "https://example.com/ksl-recreation",
        "2024-02-07",
        0,
        "center"
      ),
      createArticle(
        "pl-4",
        SOURCES[3],
        "Public Lands Forum: Exploring Paths to Common Ground",
        "Stakeholders from varied interests discuss potential compromise on land management.",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800",
        "A diverse group of stakeholders gathered to discuss public lands management. Participants included county commissioners, conservationists, recreation advocates, and industry representatives. While significant disagreements remained, some participants expressed hope for finding areas of compromise on specific issues.",
        "https://example.com/utahpolicy-lands",
        "2024-02-06",
        0,
        "center"
      ),
    ],
  },
];

export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id);
}

export function searchTopics(query: string): Topic[] {
  if (!query.trim()) return TOPICS;
  const q = query.toLowerCase().trim();
  return TOPICS.filter(
    (t) =>
      t.title.toLowerCase().includes(q) ||
      t.aiSummary.toLowerCase().includes(q) ||
      t.articles.some(
        (a) =>
          a.headline.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.source.toLowerCase().includes(q)
      )
  );
}
