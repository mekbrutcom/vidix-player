<p align="center">
  <img src="../.github/assets/vidix-player-logo.png" width="160" alt="Vidix Player logo">
</p>

# Vidix Player

Vidix Player là một thư viện thành phần sẵn sàng sử dụng cho trình phát video của nền tảng Vidix. Nó hỗ trợ nhiều ngôn ngữ, nút chia sẻ, tự động chọn máy chủ với số lượng có thể cấu hình, và nút tải xuống xuất hiện tự động nếu cài đặt nền tảng Vidix của bạn cho phép.
Mọi thứ đều có thể được cấu hình từ các thuộc tính HTML hoặc props của framework có sẵn.

Đăng ký tài khoản Vidix và bắt đầu tải nội dung lên: [Nền tảng Vidix](https://vidix.mekbrut.com)

## Ngôn ngữ

Tài liệu này có sẵn bằng các ngôn ngữ sau:

- [English (EN)](../README.md)
- [Español (ES)](./README.es.md)
- [Français (FR)](./README.fr.md)
- [हिन्दी (HI)](./README.hi.md)
- [Indonesia (ID)](./README.id.md)
- [Português (PT)](./README.pt.md)
- [Русский (RU)](./README.ru.md)
- [ไทย (TH)](./README.th.md)
- [Tiếng Việt (VI)](./README.vi.md)
- [中文 (ZH)](./README.zh.md)

## Mục lục

- [Dành cho chủ sở hữu trang web (bao gồm cả nhà phát triển)](#dành-cho-chủ-sở-hữu-trang-web-bao-gồm-cả-nhà-phát-triển)
  - [Cách sử dụng trên trang web của bạn](#cách-sử-dụng-trên-trang-web-của-bạn)
    - [Vanilla JS](#vanilla-js)
      - [Ngôn ngữ được hỗ trợ](#ngôn-ngữ-được-hỗ-trợ)
    - [React](#react)
    - [Astro](#astro)
    - [Svelte / Kit](#svelte--kit)
    - [Iframe thủ công](#iframe-thủ-công)
  - [Nâng cao](#nâng-cao)
  - [Khắc phục sự cố](#khắc-phục-sự-cố)
- [Tính minh bạch và sự khoan dung](#tính-minh-bạch-và-sự-khoan-dung)
- [Đóng góp cho kho lưu trữ](#đóng-góp-cho-kho-lưu-trữ)
- [Báo cáo lỗi và lỗ hổng bảo mật](#báo-cáo-lỗi-và-lỗ-hổng-bảo-mật)

---

## Dành cho chủ sở hữu trang web (bao gồm cả nhà phát triển)

Vidix Player tích hợp đầy đủ với nhiều framework. Hãy sử dụng thành phần tương
thích với trang web của bạn.

### Cách sử dụng trên trang web của bạn

### Vanilla JS

Phù hợp cho HTML native, PHP và các môi trường khác không chạy trên
Node.js / JavaScript bundler.

#### Script được lưu trữ

Đặt script này bên trong `<head>...</head>` của trang mà bạn muốn hiển thị
`vidix-player`:

```html
<script src="https://cdn.jsdelivr.net/npm/@mekbrut-com/vidix-player"></script>
```

#### Thành phần vidix-player

```html
<vidix-player
  playback-id="tUVARXFmPnT"
  lang=""
  accent-color=""
  layout-control-position=""
  layout-control-accent=""
  metadata-server-title="true"
  metadata-video-title=""
  metadata-thumbnail-url="https://....png"
  control-share="true"
  control-server-count="3"
  control-download="true"
  loading=""
  role=""
  aria-label="Video player"
></vidix-player>
```

#### Thuộc tính

| Prop/attr                  | Bắt buộc | Type        | Default             | Mô tả                                                                                                             |
| -------------------------- | -------- | ----------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `playback-id`              | **Có**   | string      | —                   | ID video được tạo ra từ video bạn đã tải lên trên nền tảng Vidix, ví dụ `tUVARXFmPnT`. Nếu không có nó, trình phát không hiển thị gì cả. |
| `lang`                     | Không    | string      | `<html lang>`, `en` | Ngôn ngữ giao diện, ví dụ `id`, `en`, `es_419`, `zh_tw`, `vi`. Danh sách đầy đủ: [Ngôn ngữ được hỗ trợ](#ngôn-ngữ-được-hỗ-trợ). Các giá trị không xác định sẽ rơi về `<html lang>`, sau đó là `en`. |
| `accent-color`             | Không    | string      | (theo theme)        | Màu nhấn của trình phát. Một trong: `vidix`, `default`, `red`, `orange`, `yellow`, `green`, `mint`, `teal`, `cyan`, `blue`, `indigo`, `purple`, `pink`, `brown`. Các giá trị khác bị bỏ qua. |
| `layout-control-position`  | Không    | string      | `bottom`            | Vị trí thanh điều khiển: `bottom` hoặc `top`.                                                                     |
| `layout-control-accent`    | Không    | string      | (theo theme)        | Màu nhấn của các nút trên thanh điều khiển (nút chia sẻ, chọn máy chủ và tải xuống). Cùng danh sách giá trị như `accent-color`. |
| `control-share`            | Không    | boolean     | `true`              | Hiển thị nút chia sẻ + hộp thoại chia sẻ. Liên kết được chia sẻ là liên kết trang web của bạn, không phải liên kết video trực tiếp hay liên kết nhúng. |
| `control-server-count`     | Không    | number      | `3`                 | Số lượng máy chủ trong menu chọn máy chủ. Phạm vi `0`–`10`; menu xuất hiện khi `≥ 2`.                             |
| `control-download`         | Không    | boolean     | `true`              | Hiển thị nút tải xuống video. Nút có thể tự động biến mất nếu bạn đã tắt tải xuống trong cài đặt nền tảng Vidix, ngay cả khi bạn đặt nó thành `true`. |
| `metadata-video-title`     | Không    | string      | —                   | Tiêu đề video cho tính năng trợ năng (label `aria`) và nút tải xuống.                                             |
| `metadata-thumbnail-url`   | Không    | string (URL)| —                   | URL ảnh thumbnail/poster. Được dùng làm blur-up placeholder trước khi video sẵn sàng.                             |
| `metadata-server-title`    | Không    | boolean     | `true`              | Hiển thị tên/tiêu đề do máy chủ cung cấp trong trình phát. Đặt thành `"false"` để ẩn.                            |
| `loading`                  | Không    | string      | (theo trình duyệt)  | Khi nào tải iframe của trình phát: `eager` (ngay lập tức) hoặc `lazy` (khi sắp hiển thị). Các giá trị khác bị bỏ qua. |
| `console-log`              | Không    | boolean     | `false`             | Đặt thành `"true"` để ghi các thông báo chẩn đoán ra console DevTools. Bật nó nếu bạn gặp vấn đề tích hợp — chúng sẽ hiển thị rõ ràng trong console DevTools. |
| `role`, `aria-label`       | Không    | —           | —                   | Các thuộc tính trợ năng HTML tiêu chuẩn; được truyền qua nguyên vẹn.                                              |

#### Ngôn ngữ được hỗ trợ

Trình phát nhận diện **71 mã locale** cho 37 ngôn ngữ. Mã có thể được viết với dấu
gạch nối hoặc gạch dưới (`en-GB` được đối xử giống như `en_gb`) và không phân biệt
chữ hoa/chữ thường.

| Ngôn ngữ                  | Mã `lang`                                       |
| ------------------------- | ------------------------------------------------- |
| Anh                       | `en`, `en_au`, `en_ca`, `en_gb`, `en_ie`, `en_in`, `en_sg`, `en_za` |
| Ba Lan                    | `pl`                                              |
| Bồ Đào Nha                | `pt` _(tạm thời hiển thị tiếng Anh)_, `pt_br`, `pt_pt` |
| Bulgaria                  | `bg`                                              |
| Catalonia                 | `ca`                                              |
| Đan Mạch                  | `da`                                              |
| Đức                       | `de`, `de_at`                                     |
| Estonia                   | `et`                                              |
| Hà Lan                    | `nl`                                              |
| Hàn Quốc                  | `ko`                                              |
| Hindi                     | `hi`                                              |
| Hungary                   | `hu` _(tạm thời hiển thị tiếng Anh)_              |
| Hy Lạp                    | `el`                                              |
| Iceland                   | `is`                                              |
| Indonesia                | `id`                                              |
| Latvia                    | `lv`                                              |
| Lithuania                 | `lt`                                              |
| Mã Lai                    | `ms`                                              |
| Na Uy                     | `no`                                              |
| Nga                       | `ru`                                              |
| Nhật Bản                  | `ja`                                              |
| Pháp                      | `fr`, `fr_ca`, `fr_ch`                            |
| Phần Lan                  | `fi`                                              |
| Philippines               | `fil`                                             |
| Romania                   | `ro`                                              |
| Séc                       | `cs`                                              |
| Serbia                    | `sr`                                              |
| Slovakia                  | `sk`                                              |
| Slovenia                  | `sl`                                              |
| Tây Ban Nha               | `es`, `es_419`, `es_ar`, `es_cl`, `es_co`, `es_cr`, `es_do`, `es_ec`, `es_sv`, `es_gt`, `es_hn`, `es_mx`, `es_ni`, `es_pa`, `es_pe`, `es_pr`, `es_py`, `es_us`, `es_uy`, `es_ve` |
| Thái Lan                  | `th`                                              |
| Thổ Nhĩ Kỳ                | `tr`                                              |
| Thụy Điển                 | `sv`                                              |
| Trung Quốc                | `zh`, `zh_cn`, `zh_hk`, `zh_tw`                   |
| Ukraine                   | `uk`                                              |
| Việt Nam                  | `vi`                                              |
| Ý                         | `it`                                              |

Ghi chú:

- Các biến thể theo khu vực chưa có từ điển riêng (ví dụ `en_gb`, `es_mx`,
  `fr_ca`) sẽ tự động sử dụng từ điển của ngôn ngữ gốc.
- Các mã chưa có từ điển riêng (`hu`, `pt`) tạm thời hiển thị văn bản tiếng
  Anh. Hãy sử dụng biến thể khu vực của chúng (`pt_br`/`pt_pt`) để nhận văn
  bản bằng ngôn ngữ đó.
- Các mã nằm ngoài danh sách trên sẽ rơi về `<html lang>`, sau đó là `en`.

### React

#### Cài đặt

```bash
# npm
npm install @mekbrut-com/vidix-player-react
```
```bash
# pnpm
pnpm add @mekbrut-com/vidix-player-react
```
```bash
# yarn
yarn add @mekbrut-com/vidix-player-react
```
```bash
# bun
bun add @mekbrut-com/vidix-player-react
```

Yêu cầu React 18 hoặc 19 làm peer dependency; core (`@mekbrut-com/vidix-player`) và các
helper dùng chung đi kèm dưới dạng dependencies.

#### Gắn thành phần

```tsx
import { VidixPlayer } from "@mekbrut-com/vidix-player-react";

export function Page() {
  return (
    <VidixPlayer
      playbackId="tUVARXFmPnT"
      lang="en"
      accentColor="green"
      layout={{
        controlPosition: "bottom",
        controlAccent: "red"
      }}
      metadata={{
        videoTitle: "My video",
        thumbnailUrl: "https://....png",
        serverTitle: true,
      }}
      control={{
        share: true,
        serverCount: 3,
        download: true
      }}
      loading="eager"
      consoleLog={true}
      role="region"
      ariaLabel="Video player"
    />
  );
}
```

#### Props

| Prop                       | Thuộc tính                 | Type                  | Default             | Mô tả                                                     |
| -------------------------- | -------------------------- | --------------------- | ------------------- | --------------------------------------------------------- |
| `playbackId`               | `playback-id`               | `string`              | —                   | ID video. Bắt buộc.                                       |
| `lang`                     | `lang`                     | `string`              | `<html lang>` / `en`| Ngôn ngữ UI; hỗ trợ 71 mã locale — [danh sách đầy đủ](#ngôn-ngữ-được-hỗ-trợ). |
| `accentColor`              | `accent-color`              | `AccentColor`         | —                   | Màu nhấn UI.                                              |
| `loading`                  | `loading`                  | `"eager"` \| `"lazy"` | —                   | Hành vi tải iframe/blur-up.                               |
| `consoleLog`               | `console-log`               | `boolean`             | `false`             | Ghi chẩn đoán `[vidix-player]` ra console. Chỉ dùng cho dev. |
| `lqip`                     | _wrapper-only_              | `boolean`             | `true`              | Hiển thị blur-up placeholder (xem [Nâng cao](#nâng-cao)).  |
| **`metadata`**             |                            |                       |                     |                                                           |
| `metadata.videoTitle`      | `metadata-video-title`      | `string`              | —                   | Tiêu đề iframe, label tải xuống, văn bản chia sẻ.         |
| `metadata.thumbnailUrl`    | `metadata-thumbnail-url`    | `string`              | —                   | Poster được dùng làm blur-up placeholder. URL http(s) tuyệt đối. |
| `metadata.thumbnailLqip`   | _wrapper-only_              | `string`              | —                   | Placeholder tường minh; ghi đè `thumbnailUrl` cho blur-up. |
| `metadata.serverTitle`     | `metadata-server-title`     | `boolean`             | `true`              | Sử dụng tiêu đề từ phản hồi của máy chủ.                  |
| **`layout`**               |                            |                       |                     |                                                           |
| `layout.controlPosition`   | `layout-control-position`   | `"bottom"` \| `"top"` | `"bottom"`          | Vị trí thanh điều khiển.                                  |
| `layout.controlAccent`     | `layout-control-accent`     | `AccentColor`         | —                   | Màu nhấn của các nút trên thanh điều khiển (độc lập với `accentColor`). |
| **`control`**              |                            |                       |                     |                                                           |
| `control.share`            | `control-share`             | `boolean`             | `true`              | Hiển thị nút chia sẻ + hộp thoại.                         |
| `control.serverCount`      | `control-server-count`      | `number`              | `3`                 | Máy chủ trong trình chọn, được kẹp lại `0`–`10`; hiển thị khi `2`+. |
| `control.download`         | `control-download`          | `boolean`             | `true`              | Hiển thị nút tải xuống (máy chủ vẫn có thể ẩn nó).        |
| **events**                 |                            |                       |                     |                                                           |
| `onServerData`             | `vidix:server-data`         | `(detail) => void`    | —                   | Kích hoạt kèm `{ serverCount }` khi danh sách máy chủ được giải quyết. |
| `onServerSelect`           | `vidix:server-select`       | `(detail) => void`    | —                   | Kích hoạt kèm `{ value }` khi người dùng chọn một máy chủ. |

### Astro

Wrapper Astro render một bộ khung (skeleton) Declarative Shadow DOM trên
server: hộp 16:9 + critical CSS đã có sẵn **trước khi bất kỳ JavaScript nào
được tải**, nên độ lệch bố cục (CLS) khi hydrate là ~0.

#### Cài đặt

```bash
# npm
npm install @mekbrut-com/vidix-player-astro
```
```bash
# pnpm
pnpm add @mekbrut-com/vidix-player-astro
```
```bash
# yarn
yarn add @mekbrut-com/vidix-player-astro
```
```bash
# bun
bun add @mekbrut-com/vidix-player-astro
```

Yêu cầu Astro 4+ làm peer dependency.

#### Gắn thành phần

```astro
---
import { VidixPlayer } from "@mekbrut-com/vidix-player-astro";
---

<VidixPlayer
  playbackId="tUVARXFmPnT"
  lang="en"
  accentColor=""
  layout={{
    controlPosition: "bottom",
    controlAccent: "red"
  }}
  metadata={{
    videoTitle: "My videos",
    thumbnailUrl: "https://....jpg",
    serverTitle: true,
  }}
  control={{
    share: true,
    serverCount: 3,
    download: true
  }}
  loading="eager"
  consoleLog={true}
  role="region"
  ariaLabel="Video player"
/>
```

#### Props

Danh sách prop giống với [React](#props), ngoại trừ việc Astro không có các
prop sự kiện `onServerData` / `onServerSelect`. Gắn listener của riêng bạn
trong một script phía client nếu bạn cần chúng:

```astro
<script>
  document.querySelector("vidix-player")?.addEventListener("vidix:server-data", (event) => {
    console.log("servers:", event.detail.serverCount);
  });
</script>
```

### Svelte / Kit

#### Cài đặt

```bash
# npm
npm install @mekbrut-com/vidix-player-svelte
```
```bash
# pnpm
pnpm add @mekbrut-com/vidix-player-svelte
```
```bash
# yarn
yarn add @mekbrut-com/vidix-player-svelte
```
```bash
# bun
bun add @mekbrut-com/vidix-player-svelte
```

Yêu cầu Svelte 5 làm peer dependency.

#### Gắn thành phần

```svelte
<script lang="ts">
  import { VidixPlayer } from "@mekbrut-com/vidix-player-svelte";
</script>

<VidixPlayer
  playbackId="tUVARXFmPnT"
  lang="en"
  accentColor="green"
  layout={{
    controlPosition: "bottom",
    controlAccent: "red"
  }}
  metadata={{
    videoTitle: "My video",
    thumbnailUrl: "https://....png",
    serverTitle: true,
  }}
  control={{
    share: true,
    serverCount: 3,
    download: true
  }}
  loading="eager"
  onServerData={(detail) => console.log("servers:", detail.serverCount)}
/>
```

#### Props

Danh sách prop và sự kiện giống với [React](#props) (Svelte 5 sử dụng các
callback prop `onServerData` / `onServerSelect`, không phải
`createEventDispatcher` đã bị bỏ).

### Iframe thủ công

Iframe thủ công là một iframe HTML ngữ nghĩa thông thường, nên nó chỉ có một máy chủ: máy chủ mà bạn đã chọn trên nền tảng Vidix.

Thẻ iframe này được cung cấp hoặc tạo ra bởi nền tảng Vidix từ video bạn đã tải lên — chỉ cần sao chép nó từ nền tảng Vidix và nhúng vào trang web của bạn:

```html
<iframe
  src="https://..."
  title="Example videos"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

---

## Nâng cao

**Quy tắc boolean trong Vanilla JS:** các thuộc tính boolean được bật chỉ bằng
cách viết tên của chúng (hoặc `="true"`), và tắt bằng `="false"`. Ví dụ:
`control-share="false"`.

**Props là cấu hình tại thời điểm mount.** Core đọc các thuộc tính một lần trong
`connectedCallback` (không có `observedAttributes`), nên việc thay đổi props sau
khi mount không cập nhật trình phát đang chạy. Cung cấp `key` (React/Svelte) hoặc
gắn lại phần tử khi cấu hình cần thay đổi:

```svelte
{#key playbackId}
  <VidixPlayer {playbackId} />
{/key}
```

**Theme sáng/tối**

Trình phát tự động theo theme của trang, mà không cần thuộc tính bổ sung:

- Nếu `<html data-theme="dark">` (hoặc class `dark`) tồn tại → chế độ tối.
- Nếu `<html data-theme="light">` (hoặc class `light`) tồn tại → chế độ sáng.
- Nếu không có cái nào → nó theo `prefers-color-scheme` của hệ thống người dùng.

**Ghi chú bảo mật (CSP / Trusted Types)**

Trình phát được thiết kế thân thiện với strict CSP:

- **Không `eval`, không inline event handler** — an toàn dưới `script-src` nghiêm ngặt.
- **Các style được cài đặt qua `adoptedStyleSheets`**, không phải các thẻ `<style>`
  được chèn vào — tương thích với `style-src` mà không cần `'unsafe-inline'`.
- Nếu trang web của bạn áp dụng `require-trusted-types-for 'script'`, hãy thêm
  tên policy **`vidix-player`** vào allowlist `trusted-types` của bạn. Nếu không
  có tên đó, trình phát không thể render dưới CSP đó.

## Khắc phục sự cố

- **Trình phát không xuất hiện** — kiểm tra `playback-id` (bắt buộc) và bật
  `console-log="true"` để xem các thông báo trong DevTools.
- **Thanh điều khiển bị thiếu** — thanh điều khiển chỉ xuất hiện nếu ít nhất một
  trong số `control-share`, `control-server-count` (≥ 2), hoặc `control-download`
  đang hoạt động.
- **Theme không khớp** — đảm bảo không có `data-theme` xung đột trên một thẻ
  khác; trình phát đọc theme từ phần tử `<html>`.

---

## Tính minh bạch và sự khoan dung

### Giới hạn tỷ lệ 20 yêu cầu mỗi phút cho mỗi IP của người xem

Chúng tôi giới hạn mỗi khách truy cập trang web của bạn xem video xuất hiện
nhiều nhất 20 lần mỗi phút. 20 lần mỗi phút vốn đã rất nhiều — lớn hơn 4 đến 5
lần so với sử dụng thông thường. Thường thì, hơn 20 lần mỗi phút là bot hoặc
tự động hóa đang tấn công trang web của bạn.

Việc đếm dựa trên IP của người xem. Ví dụ, người xem A (con người), người xem
B (bot tấn công), và C (crawler của công cụ tìm kiếm):

- Người xem B (bot tấn công) scrape để lấy video hàng loạt → backend của
  Vidix Player chặn nó.
- Người xem A (con người) và C (crawler của công cụ tìm kiếm) vẫn có thể truy
  cập mà không bị gián đoạn.

Gián tiếp, điều này bảo vệ video của bạn khỏi bot (thường có nghĩa là kẻ cắp
nội dung), đồng thời giữ cho backend của Vidix Player hoạt động bình thường
(để không sụp đổ vì kẻ tấn công).

### Cơ sở hạ tầng, ngôn ngữ backend và edge

**Cơ sở hạ tầng chạy ở Liên minh Châu Âu.** Toàn bộ xử lý backend chạy hoàn
toàn và được xử lý trong khu vực Liên minh Châu Âu bằng cách cân bằng tải các
yêu cầu. Đây là một lý do Vidix là một lựa chọn an toàn và nhanh.

**Ngôn ngữ backend.** Chúng tôi minh bạch về việc chúng tôi sử dụng nhiều
ngôn ngữ backend cùng lúc để giữ cho dịch vụ này tối ưu:

- **Rust** — khoảng 60% cho API.
- **Go** — khoảng 25%, giúp Rust xử lý dữ liệu vì nó cần garbage collector
  và tốc độ trình biên dịch của nó.
- **Python** — khoảng 10% cho tự động hóa hậu trường.
- **Shell** — phần còn lại, để chạy cơ sở hạ tầng, cron và các nhu cầu khác
  để giữ cho các kết nối sống.

**Mạng edge.** Chúng tôi sử dụng dịch vụ edge từ một số nhà cung cấp: một
startup tốt nghiệp YCombinator không muốn được nêu tên, Cloudflare, AWS,
Akamai, Oracle và IBM.

Chúng tôi không sử dụng GCP trong thời gian này vì chúng tôi không muốn quản
lý mạng bị can thiệp bởi AI (Gemini). Nó có thể được cấu hình, nhưng chúng tôi
chọn không sử dụng nó trong lúc này, để GDPR của Vidix luôn có thể chạy mà
không có sự can thiệp của bên thứ ba.

---

## Đóng góp cho kho lưu trữ

Chúng tôi sẽ rất biết ơn sự giúp đỡ của bạn trong việc phát triển Vidix Player.
Vui lòng gửi pull request. Cảm ơn bạn đã giúp chúng tôi phát triển thư viện
thành phần này!

Không chắc bắt đầu từ đâu? Đây là bản đồ của bạn.

### Sơ đồ mã (code-tree)

```
vidix-player/
├── packages/
│   ├── vidix-player/          core library (source of truth; TypeScript)
│   ├── vidix-player-shared/   prop/attribute/image helper dùng chung cho wrapper
│   ├── vidix-player-astro/    wrapper Astro (SSR skeleton, zero layout shift)
│   ├── vidix-player-react/    wrapper React (SSR-friendly, "use client")
│   └── vidix-player-svelte/   wrapper Svelte 5 (SSR-friendly, source-shipping)
├── e2e/                       Playwright tests + fixtures (không xuất bản)
│   ├── astro-app/             các trang parity Astro
│   ├── react-app/             các trang parity React (Vite SSR)
│   ├── svelte-app/            các trang parity Svelte (Vite SSR)
│   ├── vanillajs-app/         trang parity vanilla JS (QA thủ công)
│   └── tests/                 parity specs
├── biome.json                 config lint + format
├── tsconfig.base.json         config TypeScript cơ sở
└── pnpm-workspace.yaml        định nghĩa workspace
```

Đối với môi trường phát triển, bạn cần Node.js 18+ và
[pnpm](https://pnpm.io):

```bash
pnpm install
pnpm build       # build tất cả package trong packages/*
pnpm typecheck   # typecheck tất cả package
pnpm lint        # biome check
pnpm test:e2e    # Playwright parity tests (xem ./e2e)
```

### Các trang kiểm thử cho từng framework (E2E)

Mỗi wrapper có một trang parity để QA và người đánh giá có thể so sánh nó với
core vanilla trước khi phát hành:

| Page                          | How to run                                                       |
| ----------------------------- | ---------------------------------------------------------------- |
| Vanilla (`e2e/vanillajs-app`) | `pnpm --filter vidix-player-vanillajs-e2e run preview` → `:3713` |
| Astro (`e2e/astro-app`)       | `pnpm --filter vidix-player-astro-e2e run preview` → `:3712`      |
| React (`e2e/react-app`)       | `pnpm --filter vidix-player-react-e2e run preview` → `:3714`      |
| Svelte (`e2e/svelte-app`)     | `pnpm --filter vidix-player-svelte-e2e run preview` → `:3715`      |

Cả bốn trang đều render cùng hai trình phát (khác nhau về màu nhấn, vị trí
thanh điều khiển và ngôn ngữ) để core vanilla và mỗi wrapper có thể được so
sánh cạnh nhau. Trang vanilla sử dụng core đã được build đúng như tag CDN
(`/dist/vidix-player.js`); các trang React và Svelte kiểm thử đường dẫn SSR +
hydrate (chỉ có thuộc tính trong HTML server — không có Declarative Shadow
DOM, mà cả React lẫn Svelte đều không thể hydrate). Parity tự động nằm trong
`e2e/tests`:

- `pnpm test:e2e` chạy cả bốn project Playwright (`chromium` cho vanilla,
  `astro`, `react` và `svelte` cho các wrapper) và đảm bảo: vanilla/Astro gửi
  skeleton trước JavaScript (wrapper Astro qua Declarative Shadow DOM), các
  wrapper React và Svelte gửi phần tử trần với các thuộc tính và không có DSD,
  hình học giữ nguyên bất biến hộp 16:9 + thanh điều khiển trong mọi trường
  hợp, và iframe, hộp thoại chia sẻ cũng như chọn máy chủ đều hoạt động sau
  khi hydrate.

`csp-tt.spec.ts` của vanilla là gate strict-CSP; wrapper Astro inline critical
CSS vào skeleton SSR của nó, nên nó không kiểm tra strict CSP (xem
`packages/vidix-player-astro/README.md`).

> Bạn có thể sử dụng AI để hiểu mã và thực hiện các bản sửa lỗi. Việc merge diễn ra sau khi **push** của bạn được review bởi đội ngũ Vidix hoặc một cộng tác viên OSS đáng tin cậy.

---

## Báo cáo lỗi và lỗ hổng bảo mật

Tìm thấy lỗi? Vui lòng [mở một issue](https://github.com/mekbrutcom/vidix-player/issues).

Tìm thấy lỗ hổng bảo mật? [Báo cáo riêng tư](https://mekbrut.com/contact/bug-report).

Đối với lỗ hổng bảo mật, **không mở issue công khai**. Liên hệ với chúng tôi
qua liên kết "Báo cáo riêng tư" ở trên hoặc qua email được liệt kê trên hồ sơ
GitHub này. Chúng tôi sẽ chuyển tiếp nó đến đội ngũ bảo mật để khắc phục càng
sớm càng tốt.

---

## Giấy phép

Apache License 2.0 — xem [LICENSE](../LICENSE).
