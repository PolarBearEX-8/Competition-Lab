# dosc2.md — AI Search Instructions

> Goal: ให้ AI ค้นหาและรวบรวม “กิจกรรมที่สมัครได้” สำหรับนักเรียนมัธยม โดยเน้น Engineering, Computer, AI, Robotics, Hackathon, Innovation, Med, Game, Science และ Business

## Latest verified discoveries — 16 Sep 2026

These are already added to `src/data/camps.ts`; retain them as a deduplication reference for future searches.

| Name | Organizer | Type | Field | Deadline | Primary source |
| --- | --- | --- | --- | --- | --- |
| AI Camp 2026 รุ่นที่ 14 | Data Science and Engineering Center, KKU | Camp | AI, Com, Software, Data | 25 Sep 2026 | https://www.camphub.in.th/kku-ai-camp-2026/ · https://forms.gle/if3X9ByJqMbe8DPt8 |
| GREEN & MED TECH INNOVATION รุ่นที่ 2 | KMUTNB Faculty of Technical Education | Innovation Challenge | Innovation, Med, Environment, Design | 20 Sep 2026 | https://kmutnb.link/npKaAv · https://www.camphub.in.th/green-med-tech-innovation-2/ |
| COMM-HACK ครั้งที่ 1 | Department of Telecommunications Engineering, KMITL | Hackathon | Engi, Telecom, Electrical, Embedded | 30 Sep 2026 | https://www.instagram.com/commhack.kmitl/ · https://www.telecom.kmitl.ac.th/2026/09/07/comm-hack-%E0%B8%84%E0%B8%A3%E0%B8%B1%E0%B9%89%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88-1-%E0%B8%97%E0%B9%89%E0%B8%B2%E0%B8%97%E0%B8%B2%E0%B8%A2%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B9%80%E0%B8%AD%E0%B8%87/ |
| ESD CAMP ครั้งที่ 3 | Faculty of Engineering, Chulalongkorn University | Camp | Engi | 25 Sep 2026 | https://www.instagram.com/esdcamp.intania/ · https://www.camphub.in.th/esd-camp/ |
| ค่ายสานฝันฉันอยากเป็นครู ครั้งที่ 23 | Faculty of Education, Khon Kaen University | Camp | Education, Social Science | 23 Sep 2026 | https://sanfuncampedkku.com/ · https://www.camphub.in.th/san-fun-camp-23/ |

Both listings were checked against the organizer-linked registration path and CampHUB on 16 Sep 2026. Do not create duplicate listings under shortened or translated names.

# Output Format

ทุกกิจกรรมให้เก็บข้อมูลรูปแบบนี้:

NAME | Organizer | TYPE | FIELD | Open date | Last submit | State

Example:

BangMod Hackathon 2026 | KMUTT | Hackathon | Engi, Com, Software | 1 Sep 2026 | 20 Sep 2026 | Close in 5 days

LarnGear 26 | CU | Camp | Engi | 5 Sep 2026 | 16 Sep 2026 | Close in 1 day

IIC 2027 | CU | Competition | Engi, Innovation, Com, Robotics | Unknown | Unknown | Not open yet

---

# TYPE Values

Use one or more:

- Camp
- Hackathon
- Competition
- Case Competition
- Coding Competition
- Robotics Competition
- Innovation Challenge
- Research Competition
- Workshop
- Open House
- Internship
- Bootcamp
- Game Jam
- Startup Challenge
- Olympiad

---

# FIELD Values

Use short tags:

- Engi
- Com
- Software
- AI
- Robotics
- Electrical
- Mechanical
- Civil
- Chemical
- Industrial
- Materials
- Aerospace
- Telecom
- IoT
- Embedded
- Cyber
- Data
- Science
- Med
- BioMed
- Business
- Startup
- Game
- Design
- Architecture
- Environment
- Space
- Quantum

---

# State Rules

If registration is open:

Open

If close date is known and within 7 days:

Close in X days

If registration has not started and open date is known:

Open in X days

If event exists but application date is unknown:

Open / Unknown deadline

If next year's event is expected but not announced:

Not announced

If event page exists but application is not open:

Not open yet

If deadline passed:

Closed

If reliable status cannot be determined:

Unknown

---

# Search Strategy

## 1. Search by Activity Name

For every known activity, search:

"<activity name>" Instagram
"<activity name>" IG
"<activity name>" 2026
"<activity name>" 2569
"<activity name>" 2027
"<activity name>" สมัคร
"<activity name>" เปิดรับ
"<activity name>" application
"<activity name>" registration

Example:

"BangMod Hackathon" Instagram
"BangMod Hackathon 2026"
"BangMod Hackathon สมัคร"

---

## 2. Google → Instagram Indexed Search

Use:

site:instagram.com "<activity name>"
site:instagram.com "<university>" hackathon
site:instagram.com "<university>" camp
site:instagram.com "<faculty>" competition
site:instagram.com "<faculty>" เปิดรับ
site:instagram.com "<faculty>" สมัคร
site:instagram.com/reel "<activity name>"

Example:

site:instagram.com "Dongtan Camp"
site:instagram.com "KMUTT" hackathon
site:instagram.com "วิศวกรรม เกษตร" ค่าย
site:instagram.com "จุฬา" hackathon

---

# 3. Search by University + Department

For each university:

"<university> engineering camp 2026"
"<university> hackathon 2026 high school"
"<university> innovation challenge high school"
"<university> robotics competition high school"
"<department> camp 2026"
"<department> hackathon"
"<department> youth camp"

Departments to search:

- Computer Engineering
- Electrical Engineering
- Mechanical Engineering
- Civil Engineering
- Chemical Engineering
- Industrial Engineering
- Materials Engineering
- Environmental Engineering
- Biomedical Engineering
- Aerospace Engineering
- Robotics / Automation
- Telecom
- AI / Data Science
- Computer Science
- Information Technology

---

# 4. Thai Search Queries

Use combinations:

"ค่ายวิศวะ" 2569
"ค่ายวิศวะ" 2570
"ค่าย ม.ปลาย วิศวะ"
"แข่งขัน วิศวกรรม ม.ปลาย"
"แข่งขันเขียนโปรแกรม ม.ปลาย"
"แข่งขันหุ่นยนต์ ม.ปลาย"
"hackathon ม.ปลาย"
"hackathon วิศวะ"
"hackathon มหาวิทยาลัย"
"innovation challenge ม.ปลาย"
"ประกวดนวัตกรรม ม.ปลาย"
"ค่ายคอม ม.ปลาย"
"ค่าย AI ม.ปลาย"
"ค่าย robotics ม.ปลาย"
"ค่าย computer engineering"
"ค่าย electrical engineering"
"ค่าย mechanical engineering"
"ค่าย chemical engineering"
"ค่าย biomedical engineering"
"ค่าย aerospace"
"แข่งขัน CanSat"
"แข่งขัน IoT"
"แข่งขัน ESP32"
"แข่งขัน line follower"
"แข่งขัน coding"
"แข่งขัน C++ ม.ปลาย"

---

# 5. Search Aggregators

Search these regularly:

CampHUB
PorTCAS
TCASter
Devpost
MLH
Lablab
Unstop
Kaggle
VEX Events
NSTDA
NECTEC
NIA
depa
GISTDA
itch.io Game Jams

For CampHUB:

site:camphub.in.th 2569 วิศวะ
site:camphub.in.th hackathon
site:camphub.in.th robotics
site:camphub.in.th computer engineering
site:camphub.in.th AI
site:camphub.in.th มหาวิทยาลัยเกษตรศาสตร์
site:camphub.in.th KMUTT
site:camphub.in.th KMITL
site:camphub.in.th จุฬา
site:camphub.in.th มหิดล

---

# 6. Verification Rules

Never publish an activity from only one weak source if official confirmation can be found.

Priority:

1. Official event website
2. Official university/faculty/department page
3. Official event Instagram/Facebook
4. CampHUB / PorTCAS / TCASter
5. Google / community / repost

If two sources disagree:

- Prefer newest official source
- Record both if needed
- Mark "Needs verification" if conflict remains

---

# 7. Eligibility Checks

Before listing as "recommended for high school", check:

- Grade level
- Age
- School type
- Science-Math requirement
- Individual or team
- Team size
- Same-school requirement
- Teacher advisor required?
- Thai nationality required?
- Onsite/Online
- Location
- Fee
- Deadline
- Event date

Do not assume M.5 can apply.

---

# 8. More Info Fields

When user clicks NAME, show:

Description
Eligibility
Event date
Location
Team size
Cost
Prize
Apply link
Instagram
Official website
Found from
Official source
Last checked
Notes

---

# 9. Source Storage

Store at least:

discovery_source
official_source
social_source
last_checked

Example:

discovery_source:
- CampHUB
- Google
- Instagram

official_source:
- https://...

social_source:
- https://instagram.com/...

last_checked:
- 2026-09-15

---

# 10. Deduplication Rules

Same event may appear on:

- CampHUB
- IG
- University website
- Facebook
- PorTCAS

Treat as one event.

Deduplicate using:

activity name
organizer
year
event date

Example:

"BangMod Hackathon"
"BangMod Hackathon 2026"
"Bangmod Hack 2026"

=> same event if organizer/date match.

---

# 11. Recurring Event Detection

If past-year event exists but current-year announcement is missing:

Keep a watch entry.

Example:

Dongtan Camp 21 existed in 2025
Dongtan Camp 22 not found

Output:

Dongtan Camp 22 | KU | Camp | Engi | Unknown | Unknown | Not announced

Search it again regularly.

---

# 12. Important Watch Keywords

High Priority:

IIC
ICC
LarnGear
Dongtan Camp
Khanknot
ComCamp
BangMod Hackathon
IECU Hackathon
Mat-E Youth Camp
คนชอบกล
Let Me Tired
CHECK Camp
J-ENV
Civil Camp KMUTT
BEAM Camp
CEL Camp
EYC
MUIE Youth Camp
SIIT Insight Camp
TUE FREE
COMM-HACK
ARISE
KORAT WELL-BEING HACK
CMKL AI Ascend
Fun with Mechanics
AI Inspiration Saturday
YSC
NSC
VEX Thailand
WRO Thailand
NASA Space Apps
CanSat

---

# 13. Search Frequency

Recommended:

High-priority official IG/pages:
Daily

CampHUB / PorTCAS / TCASter:
Daily or every 2 days

University websites:
2–3 times/week

International Hackathons:
Weekly

Past recurring camps:
Weekly during expected announcement season

---

# 14. Final AI Instruction

When searching:

- Find as many relevant activities as possible.
- Prefer current/future activities.
- Do not hide activities just because deadline is unknown.
- Mark unknown values as Unknown.
- Always record source links.
- Verify dates before marking Open.
- Keep closed activities only if useful for predicting next year's event.
- Prioritize high-school eligible activities.
- Prioritize Engineering, Computer, AI, Robotics, Hackathon and Innovation.
- Return concise one-line rows for the main list.
- Put deeper details only inside More Info.
