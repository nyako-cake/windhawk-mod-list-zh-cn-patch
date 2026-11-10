/* Windhawk 界面汉化补丁（webview 注入）
 *
 * 做两件事，都只影响显示，不改程序本身：
 *  1. 内置译文表：mod 名称/描述命中即替换成中文，不发任何请求；
 *  2. 内置机翻兜底：译文表没收录、但确实属于 mod 内容的文本，送去机翻，
 *     结果缓存在 localStorage，下次打开直接命中。
 *
 * 判断"是不是 mod 内容"用的是随补丁打包的一份名单（目录里所有 mod 的
 * 英文名和描述），所以不会误翻界面按钮、统计数字之类的东西。
 */
(function () {
  'use strict';
  if (window.__whZhCnPatch) return;
  window.__whZhCnPatch = true;

  var PAIRS = {"Alt+Tab window delayer":"Alt+Tab 延迟显示","Alt+Tab Flip 3D (Vista Style)":"Alt+Tab Flip 3D（Vista 风格）","Alt+Tab per monitor":"按显示器切换 Alt+Tab","Block Win+V":"阻止 Win+V","CEF/Spotify Tweaks":"CEF/Spotify 增强","Lunar & Holiday Calendar":"农历与节假日日历","Chrome/Edge scroll tabs with mouse wheel":"Chrome/Edge 滚轮切换标签页","Smart Copy & Paste":"智能复制粘贴","Custom Cached Context Menu":"自定义缓存上下文菜单","Custom Window Corner Radius":"自定义窗口圆角","Dark mode context menus":"深色右键菜单","Desktop Disk Icon":"桌面显示U盘图标","Desktop Icon Dock":"桌面图标 Dock","2D Rectangular Selection for Desktop":"桌面图标矩形选择","Disable rounded corners in Windows 11":"禁用 Windows 11 圆角","Disable Task Manager Navigation Border":"禁用任务管理器的导航边框","Dynamic Island for Windows":"Windows 灵动岛","Dynamic Taskbar Transparency":"动态任务栏透明","Excel Wheel Sheet Navigation":"Excel 滚轮切换工作表","Classic context menu on Windows 11":"Windows 11 经典右键菜单","Explorer Ctrl+N to New File":"用 ctrl+n 创建新文件","Better file sizes in Explorer details":"资源管理器详细信息中的文件大小增强","Explorer Properties Button":"资源管理器属性按钮","Explorer Tab Router":"资源管理器页签路由","Turn off change file extension warning":"关闭改扩展名警告","F1 Blocker":"F1 屏蔽","File Explorer WinUI-Like Content Animation":"资源管理器内容区动画","Remove Taskbar Window Suffixes":"移除任务栏窗口后缀","File Operation Styler":"文件操作样式","Fix white flashes in explorer":"修复资源管理器白屏闪烁","Fix Task Manager Details Icon Size":"修复任务管理器详细信息页图标大小","Force Desktop Icon Spacing":"强制桌面图标间距","Force System Cursor":"强制系统光标","Resource Redirect":"资源重定向","Invisible Window Borders":"隐藏窗口边框","Island Media Controls":"灵动岛媒体控制","Lock Screen Clock Styler":"锁屏时钟样式定制","Mac Island & Dock":"Mac 灵动岛与 Dock","MacOS Minimize Animation":"macOS 风格最小化动画","Minecraft launcher region detection spoof":"启动器设备区域伪装","Mobile Open Animation":"移动端风格的窗口打开动画","Modernize Folder Picker Dialog":"现代化文件夹选择对话框","Mouse Trail":"鼠标拖尾","Mute in Background":"后台自动静音","No Focus Rectangle":"移除焦点矩形","Dark Mode for Notepad":"记事本深色模式","Customize Windows notifications placement":"自定义通知位置","Office Fix Account Display Name":"Office 修复右上角账户名显示","Office UI Reverter (32/64-bit Universal)":"Office 还原旧版 UI 界面（32/64 位通用）","Open With - Remove Microsoft Store Menu Item":"打开方式：移除微软商店项","Disable IME in Run Dialog":"运行对话框自动关闭输入法","Shell Flyout Positions":"系统弹窗位置","Slick Window Arrangement":"顺滑窗口排列","Spoof MachineGuid":"伪造 MachineGuid","Start Menu Size":"开始菜单尺寸","Taskbar auto-hide speed":"任务栏自动隐藏速度","Taskbar auto-hide when maximized":"最大化时自动隐藏任务栏","Taskbar Auto-Hide Instant Show":"任务栏自动隐藏即时显示","Taskbar Background Helper":"任务栏背景助手","Taskbar brightness and opacity tuner":"任务栏亮度和透明度调节器","Middle click to close on the taskbar":"中键关闭任务栏程序","Taskbar Clock Customization":"任务栏时钟自定义","Taskbar Dock Animation":"任务栏 Dock 动画","Taskbar Dock Animation Plus":"任务栏 Dock 动画增强版","Click on empty taskbar space":"点击任务栏空白处","Taskbar Fluent Media Player":"任务栏 Fluent 媒体播放器","Disable grouping on the taskbar":"关闭任务栏窗口分组","Taskbar Icon Group Centering":"任务栏图标组居中","Taskbar height and icon size":"任务栏高度与图标尺寸","Taskbar Labels for Windows 11":"Windows 11 任务栏标签","Taskbar Margin":"任务栏边距","Taskbar tray icon spacing and grid":"任务栏托盘图标间距与网格","Taskbar on top for Windows 11":"Windows 11 任务栏置顶","Aero Peek on \"Show desktop\" button hover":"「显示桌面」按钮 Aero Peek","Start button colorizer":"开始按钮变色","Start button always on the left":"开始按钮固定靠左","Taskbar Thumbnail Reorder":"任务栏缩略图排序","Disable Taskbar Thumbnails":"禁用任务栏缩略图","Taskbar tray system icon tweaks":"任务栏托盘系统图标调整","Vertical Taskbar for Windows 11":"Windows 11 竖向任务栏","Taskbar Volume Control":"任务栏音量控制","Taskbar Volume Control Per-App":"按应用调节音量","Press Esc to exit Task Manager":"ESC键退出任务管理器","Task Manager Show Link Speed":"任务管理器显示链路速度","Make Task Manager Tabs Taller":"增大任务管理器选项卡尺寸","Translucent Windows":"半透明窗口","UXTheme hook":"UXTheme 主题支持","Vector Screen Holder":"矢量屏幕守护","Visio Thumbnail HD Fix":"Visio 缩略图高清修复","Visio: Middle Mouse Pan & Smart Zoom":"Visio 中键平移与智能缩放","VMware Audio Distortion Fix":"VMware 音频失真修复","Windows 11 Start Menu Power Buttons":"Windows 11 开始菜单一键电源按钮","Win32 UI Modernizer":"Win32 界面现代化","Windows 7 On Screen Keyboard Restorer":"Windows 7 屏幕键盘还原","Windhawk UI Translator":"Windhawk 界面翻译","Windows 11 File Explorer Styler":"Windows 11 资源管理器美化","Windows 11 Notification Center Styler":"Windows 11 通知中心美化","Windows 11 Settings Styler":"Windows 11 设置美化","Windows 11 Start Menu Styler":"Windows 11 开始菜单美化","Windows 11 Taskbar Styler":"Windows 11 任务栏美化","Windows Animations":"窗口动画增强","Windows Sandbox: close without confirmation":"沙盒关闭免确认","WinTips OSD":"WinTips 键盘状态提示","WinUI Context Menu Animation":"WinUI 右键菜单动画","Word Image Resize Anti-Flip":"Word 图片调整大小时防翻转","Word MathType Dark Mode Fix":"Word MathType 公式深色模式修复","Word OfficeMath EditBox Shade Fix":"Word OfficeMath 公式编辑框阴影修复","Word PDF Lossless Export":"Word 图像无损导出 PDF","Delays the appearance of the Alt+Tab window, preventing flickering and reducing distractions during fast app switching":"延迟 Alt+Tab 窗口的出现，避免快速切换应用时闪烁和干扰","Replaces Alt+Tab with a fluid, Windows Vista-style Flip 3D stack of live windows":"用流畅的 Vista 风格 Flip 3D 立体窗口堆栈替换 Alt+Tab","Pressing Alt+Tab shows all open windows on the primary display. This mod shows only the windows on the monitor where the cursor is.":"按 Alt+Tab 时只显示光标所在显示器上的窗口，而不是全部窗口","Make Antigravity IDE portable by redirecting user data and extensions directories.":"使 Antigravity IDE 成为便携版，重定向数据与扩展目录。","Blocks the Win+V keyboard shortcut (Clipboard History)":"阻止 Windows 的 Win+V 键盘快捷键（剪贴板历史记录）","Various tweaks for Spotify, including native frames, transparent windows, and more":"Spotify 的多种调整：原生标题栏、透明窗口等","Write your own text and colour into the Windows 11 calendar: holidays from an iCalendar (.ics) feed, dates matched by your rules, and optionally the Vietnamese lunar calendar":"在 Windows 11 日历里写自己的文字和颜色：按规则标记 ICS 订阅中的节假日，或直接标记农历/阳历日期；也可以换成越南农历","Use the mouse wheel while hovering over the tab bar to switch between tabs":"鼠标悬停在标签栏上时滚动滚轮即可切换标签页","Automatically format, clean, and enrich text instantly as you copy it to the clipboard.":"复制到剪贴板时自动格式化、清理和丰富文本内容。","Instantly-opening cached Explorer context menu that is fully customizable: themes, layout, colors, animations, rules, and custom commands.":"立即打开缓存的 Explorer 上下文菜单，可完全自定义：主题、布局、颜色、动画、规则和自定义命令。","Customizes window corner radius in Windows 11, making corners more or less rounded":"调整 Windows 11 的窗口圆角半径，让圆角更大或更小","Enables dark mode for all win32 menus.":"为所有 Win32 菜单启用深色模式","Displays external storage devices as native desktop icons":"将外接存储设备以系统桌面图标的形式呈现","A standalone macOS-style dock: drag shortcuts, files and folders onto it, reorder them, drag them out to put them back on the desktop; shortcuts are copied into a dock-owned folder so desktop cleanups do not affect the dock; optional glass panel":"独立的 macOS 风格 Dock：把快捷方式、文件和文件夹拖进来，拖动排序，拖出放回桌面；快捷方式会复制到 Dock 自己的目录，清理桌面不影响 Dock；可选液态玻璃面板","Bring 2D rectangular selection to desktop icons, similar to Excel.":"在桌面图标上使用类似 Excel 的二维矩形选择方式。","A simple mod to disable window rounded corners in Windows 11":"关闭 Windows 11 的窗口圆角","Disable Task Manager navigation and generic focus borders.":"禁用任务管理器的导航边框和焦点边框。","A living, breathing pill overlay inspired by iPhone's Dynamic Island. Reacts to media, downloads, clipboard, battery, and more.":"模仿 iPhone 灵动岛的胶囊悬浮条，可响应媒体、下载、剪贴板、电量等状态","Dynamically changes the Windows 11 taskbar XAML background transparency for desktop, Start, search, tray flyouts, task view, and maximized windows.":"按桌面、开始菜单、搜索、托盘弹出、任务视图和最大化窗口等场景动态调整 Windows 11 任务栏的背景透明度","Scroll the sheet tab strip with the vertical wheel and switch sheets with the horizontal wheel":"使用原生箭头滚动标签栏，左右拨动一次切换一张工作表","Always show the classic context menu without having to select \"Show More Options\" or hold Shift":"始终显示经典右键菜单，无需再点「显示更多选项」或按住 Shift","Enhances file size display in Explorer details with folder sizes, human-readable units (MB/GB), and optional IEC notation (KiB/MiB)":"在资源管理器「详细信息」中显示文件夹大小、易读单位（MB/GB），可选 IEC 写法（KiB/MiB）","Add a Properties button to the Windows 11 File Explorer command bar, between Delete and Sort, opening the properties dialog of the current selection":"在 Windows 11 文件资源管理器命令栏（\"删除\"与\"排序\"按钮之间）添加属性按钮，点击打开当前选中项目的属性对话框","Reuse and activate Explorer folder tabs, preserve file selection and explicit new windows":"复用并切换资源管理器页签，保留文件选中状态和明确的新窗口操作","When a file is renamed and its extension is changed, a confirmation warning appears, this mod turns it off":"重命名文件并改动扩展名时不再弹出确认警告","Prevent F1 from opening the help page in File Explorer and/or other selected applications":"阻止按 F1 在资源管理器或指定程序中打开帮助页面","Smooth WinUI-like page transition animations for the File Explorer content area.":"为文件资源管理器内容区加入类似 WinUI 的页面切换动画","Remove suffixes from taskbar window titles for File Explorer and other programs, or configure custom text replacement rules":"去掉资源管理器等程序在任务栏标题中的后缀，也可自定义文本替换规则","Portable custom presentation for native Explorer file operations with a skin-safe unified presentation.":"为资源管理器的原生文件操作提供可自定义、不破坏主题的统一界面","Removes the annoying white flash when opening Explorer tabs.":"消除打开资源管理器标签页时的白色闪屏","Fix task manager details icon size to normal.":"修复任务管理器“详细信息”和“服务”页面的图标大小。","Set the desktop icon grid spacing (X/Y) and reserve a blank margin above the taskbar. Event-driven and DPI-aware, with a short startup icon-count check; the original spacing and height are restored on unload.":"设置桌面图标的水平/垂直网格间距，并在任务栏上方预留底部空白边距。事件驱动、支持 DPI 缩放，含启动阶段短暂的图标数量检查；停用模组后自动还原间距与高度。","Replaces game custom cursors with the system default cursor or a built-in custom cursor, while allowing cursor hiding to work normally.":"将游戏的自定义光标替换为系统默认光标或内置光标，同时不影响游戏正常的隐藏光标行为。","Define alternative files for loading various resources (e.g. icons in imageres.dll) for simple theming without having to modify system files":"为各类资源（如 imageres.dll 中的图标）指定替代文件，无需改动系统文件即可简单换肤","Makes window borders invisible while keeping rounded corners":"让窗口边框不可见，同时保留圆角","Dynamic island-like media controls for the Windows 11 taskbar.":"为 Windows 11 任务栏加入类似灵动岛的媒体控制面板","Customize the Windows 11 lock screen clock with modern styles, date display, and widget controls.":"使用现代样式、日期显示和小组件控制来自定义 Windows 11 锁屏时钟。","An island at the top of the screen like the macOS menu bar and the iPhone's Dynamic Island (clock, control center, notifications, media, tray icons), and a macOS-like dock instead of the taskbar (or the Windows taskbar, transparent or as it is)":"屏幕顶部仿 macOS 菜单栏与 iPhone 灵动岛（时钟、控制中心、通知、媒体、托盘图标），并用 macOS 风格 Dock 取代任务栏（或保留原任务栏、可透明）","Smooth macOS-style genie minimize, restore (open) and optional close animations for every window.":"为每个窗口提供 macOS 风格「精灵」式最小化与还原动画，可选关闭动画","Shake the mouse cursor to summon a Googlebook-style Magic Pointer, then point at or select anything on screen and ask Gemini, ChatGPT or Claude about it":"摇动鼠标指针，唤出 Googlebook 风格的 Magic Pointer，然后指向或选择屏幕上的任意内容，并向 Gemini、ChatGPT 或 Claude 提问","Spoof process region signals for PCL CE and HMCL.":"伪装PCL CE和HMCL读取到的设备信息","App windows zoom open from the icon (cursor position) with a fade, phone-style, using a splash panel with the app icon.":"让应用窗口像手机桌面那样从你点击的图标处放大铺开并淡入：用一块带应用图标的占位面板做展开动画，等真窗口画好再交接。","Replaces the classic \"Browse For Folder\" dialog":"用新版对话框替换经典的「浏览文件夹」窗口","A highly customizable mouse trail effect.":"高度可自定义的鼠标拖尾效果。","Automatically mutes the program when it goes to the background and restores it when it returns to the foreground.":"当程序切换到后台时自动静音，切回前台时恢复","Removes the focus rectangle":"去掉控件获得焦点时显示的虚线矩形","The missing dark mode theme for Notepad":"为记事本补上缺失的深色主题","Move notifications to another monitor or another corner of the screen":"把通知移到其他显示器或屏幕的其他角落","Fixes the inverted First/Last name and the hardcoded space in Office apps. Supports custom display name override.":"彻底修复 Office 软件右上角账户名中英倒置以及强行插入空格的问题，支持自定义名称","Reverts Office 2022+/365 UI to Office 2016/2019":"将 Office 2022+/365 的 UI 界面外观还原为 Office 2016/2019","Removes the \"Search with Microsoft Store\" menu item from the \"Open with\" submenu":"从「打开方式」子菜单中移除「在 Microsoft Store 中查找」","Disable IME automatically when typing in the Run dialog, to prevent accidental input of non-English characters.":"在资源管理器 Win+R 运行对话框输入时自动禁用输入法, 防止意外输入中文等非英文字符.","Customize the position of the Notification Center, Action Center, and Start menu on Windows 11":"自定义 Windows 11 通知中心、操作中心和开始菜单的弹出位置","Make window arrangement more slick and pleasant with a sliding animation and snapping":"用滑动动画与贴边吸附让窗口排列更顺滑自然","Replaces the MachineGuid returned by registry queries, for the target process only":"替换目标进程查询注册表时返回的 MachineGuid，系统真实值不受影响","Set a custom size for the Start menu and search menu on Windows 11":"为 Windows 11 的开始菜单与搜索面板设置自定义尺寸","Shows your Claude, Codex, Antigravity and GitHub Copilot usage limits as ring tiles on the Windows 11 taskbar, with a Fluent flyout for the details":"在 Windows 11 任务栏上以圆环磁贴显示 Claude、Codex、Antigravity 和 GitHub Copilot 的用量上限，并通过 Fluent 浮出面板查看详情","Customize the taskbar auto-hide animation speed and frame rate to make it feel less sluggish and janky":"调整任务栏自动隐藏动画的速度与帧率，消除迟钝和卡顿感","Makes the taskbar auto-hide only when a window is maximized or intersects the taskbar":"仅在窗口最大化或与任务栏交叠时自动隐藏任务栏","Allow taskbar autohide when inactive window notified":"非活动窗口有通知时，任务栏仍然可以自动隐藏","Removes the delay before the taskbar appears with custom animation types (none, slide, elastic, bounce, fade, slide+fade, overshoot)":"取消任务栏弹出前的延迟，并提供无、滑动、弹性、回弹、淡入、滑动+淡出、过冲等动画类型","Sets the taskbar background for the transparent parts, always or only when there's a maximized window, designed to be used with Windows 11 Taskbar Styler":"为任务栏的透明区域设置背景色，可常驻或仅在有最大化窗口时生效，配合任务栏美化使用","Adjust the opacity of the taskbar background and of the icons and text, and dim the taskbar background, for a clean, beautiful taskbar which is easier on the eyes and on OLED displays":"分别调整任务栏背景与图标文字的不透明度，并可调暗任务栏背景，定制出简洁漂亮的任务栏，也更护眼、更适合 OLED 显示器","Close programs with a middle click on the taskbar instead of creating a new instance":"在任务栏按钮上单击鼠标中键即可关闭程序，而不是新开一个实例","Custom date/time format, news feed, weather, performance metrics (upload/download speed, CPU, RAM, GPU, battery), media player info, custom fonts and colors, and more":"自定义日期时间格式，并显示新闻、天气、性能指标（上下行速度、CPU、内存、GPU、电量）、媒体播放信息、字体与颜色等","Animates taskbar icons on mouse hover like in macOS":"类似 macOS 的任务栏图标悬停动画","Animates taskbar icons on mouse hover like in macOS (updated fork with support for all taskbar positions and multi-monitor fixes)":"类似 macOS 的任务栏图标悬停动画（支持所有任务栏位置和多显示器修复的更新版）","Trigger custom action when empty space on a taskbar is clicked. Various mouse clicks and keyboard modifiers are supported.":"点击任务栏空白区域时触发自定义操作，支持多种鼠标点击与键盘修饰键","Taskbar Fluent Media Player — is a Windhawk mod that integrates a modern media player with Fluent Design directly into the Windows 11 taskbar. It allows you to control music and view track information seamlessly without interrupting your workflow.":"把 Fluent 设计风格的现代媒体播放器整合进 Windows 11 任务栏，可控制播放并查看曲目信息","Causes a separate button to be created on the taskbar for each new window":"每个新窗口都在任务栏上生成独立按钮，不再合并","Center the taskbar icons after a chosen position as one group relative to the whole taskbar. Requires the taskbar to be set to Left alignment.":"把任务栏中指定位置之后的图标作为一组相对整条任务栏居中。需要把任务栏对齐方式设为左对齐。","Control the taskbar height and icon size, improve icon quality (Windows 11 only)":"调整任务栏高度和图标大小，并改善图标清晰度（仅 Windows 11）","Customize text labels and combining for running programs on the taskbar (Windows 11 only)":"自定义任务栏上运行程序的文字标签与合并方式（仅 Windows 11）","Adds a configurable margin to the taskbar content":"为任务栏内容添加可调节的边距","Reduce or increase the spacing between tray icons on the taskbar, optionally have a grid of tray icons (Windows 11 only)":"增大或减小托盘图标间距，可选按网格排列（仅 Windows 11）","Moves the Windows 11 taskbar to the top of the screen":"把 Windows 11 任务栏移到屏幕顶部","Enable Aero Peek when hovering over the \"Show Desktop\" button, like it was possible before Windows 11":"悬停「显示桌面」按钮时启用 Aero Peek，恢复 Windows 11 之前的效果","Recolor the Start button icon on the taskbar with a color preset or with hue, saturation, brightness and opacity effects, and change its size (Windows 11 only)":"用预设颜色或色相、饱和度、明度、透明度重新给任务栏开始按钮上色，并可调整大小（仅 Windows 11）","Forces the Start button to be on the left of the taskbar, even when taskbar icons are centered, with an option to also move the search and task view buttons (Windows 11 only)":"即使任务栏图标居中，也让开始按钮固定在左侧，可同时移动搜索与任务视图按钮（仅 Windows 11）","Reorder taskbar thumbnails with the left mouse button":"用鼠标左键拖动来调整任务栏缩略图的顺序","Disable taskbar thumbnail and virtual desktop switcher hover flyouts, or replace thumbnails with a list":"关闭任务栏缩略图与虚拟桌面切换器的悬停弹窗，或用列表替代缩略图","Allows hiding system icons: volume, network, battery, microphone, location/GPS, Studio Effects, Recall, language bar, bell (always or when there are no new notifications), and the \"Show desktop\" button (hide or set width)":"隐藏音量、网络、电池、麦克风、定位、工作室效果、Recall、语言栏、通知铃铛（始终或仅无新通知时）以及「显示桌面」按钮（可隐藏或改宽度）","Finally, the missing vertical taskbar option for Windows 11! Move the taskbar to the left or right side of the screen.":"补上 Windows 11 缺失的竖向任务栏，可把任务栏移到屏幕左侧或右侧","Control the system volume by scrolling over the taskbar or anywhere with modifier keys":"在任务栏上滚动滚轮即可调节系统音量，也可按住修饰键在任意位置调节","Control the per-app volume by scrolling over taskbar buttons":"在任务栏按钮上滚动滚轮即可调节该应用的音量","Replace DNS names in Task Manager with realtime link speeds because we care more about it.":"在任务管理器网卡页面中显示实际链路速度","Windows 10 Task Manager tab labels are too small on high DPI screens, making them difficult to click, this mod makes them taller.":"Windows 10 任务管理器选项卡标签在高分屏上实在太小, 根本不好点击, 安装后会增大选项卡标签的高度.让其更易于使用.","Enables native translucent effects in Windows 11":"为 Windows 11 启用原生半透明效果","Allows you to apply custom themes":"允许应用第三方自定义系统主题","Fills a display you choose with generative line art and keeps the PC from idling while it runs":"用生成式线条艺术填满所选显示器，并在运行期间防止电脑进入闲置状态","Fix low-resolution thumbnails for Visio documents in File Explorer":"修复资源管理器中 Visio 文档低质量缩略图问题","Brings modern CAD-like navigation to Visio: Middle-drag to pan, scroll wheel to zoom.":"为 Visio 带来现代化的导航体验：中键拖拽平移，滚轮直接缩放，完美兼容触摸板。","Fixes distorted audio in VMware virtual machines by setting high-resolution timers.":"通过设置高分辨率定时器修复 VMware 虚拟机中的失真音频。","Press Win+D to only manage the windows on the monitor where the mouse is located.":"按下Win+D时 只最小化/还原鼠标所在显示器的窗口","A compact ring widget for the Windows 11 taskbar clock: a battery gauge ring, a Wi-Fi symbol, the time and date, and a charging animation":"一个替换 Windows 11 任务栏时钟的圆环小组件：电量圆环、Wi-Fi 图标、时间日期，以及充电动画","Adds customizable one-click Shut down, Restart, Sign out, Sleep, Hibernate, and Lock buttons to the Windows 11 Start menu, replacing the default power flyout.":"添加可配置的一键关机/重启/注销/睡眠/休眠/锁定按钮到 Windows 11 开始菜单，替换默认的电源按钮二级菜单。","Modernizes legacy Win32 UI elements":"将旧版 Win32 界面元素全面现代化，使其符合 WinUI 3 / Fluent Design 视觉风格","This mod redirects the Windows 10/11 On-Screen Keyboard (osk.exe) to the original Windows 7 one":"此模组将 Windows 10/11 的屏幕键盘 (osk.exe) 重定向为 Windows 7 的原始版本","Translates mod names, summaries, READMEs, settings and changelogs in place inside the Windhawk UI.":"在 Windhawk 界面里就地翻译模组内容（名称、简介、说明文档、设置项、更新日志）。","Customize the File Explorer with themes contributed by others or create your own":"使用他人分享的主题或自制主题来美化文件资源管理器","Customize the Notification Center and Action Center with themes contributed by others or create your own":"使用他人分享的主题或自制主题来美化通知中心与操作中心","Customize the Windows Settings app with themes contributed by others or create your own":"使用他人分享的主题或自制主题来美化「设置」应用","Customize the Start menu with themes contributed by others or create your own":"使用他人分享的主题或自制主题来美化开始菜单","Customize the taskbar with themes contributed by others or create your own":"使用他人分享的主题或自制主题来美化任务栏","Smooth minimize, restore, close, switch animations for windows.":"为窗口的最小化、还原、关闭和切换加入更顺滑的动画","Stops the sandbox with \"wsb stop\" when its window is closed":"关闭沙盒窗口时直接执行 wsb stop，不再弹出确认","Shows a Win11-style floating OSD for Caps/Num/Scroll Lock, Insert and copy/paste/cut":"按下大写/数字/滚动锁定、Insert 或复制/粘贴/剪切时弹出 Win11 质感的浮窗提示","Adds smooth WinUI-style vertical slide animations to classic Win32 context menus in Windows 11":"为 Windows 11 的经典 Win32 右键菜单加入 WinUI 风格的纵向滑出动画","Prevents unintended flipping when dragging handles to resize images in Word.":"在 Microsoft Word 中调整图片大小时防止图片意外翻转","Fix the readability issue of MathType Equations in Word dark mode.":"解决 Word 深色模式下 MathType 公式的可读性问题","Fix the shade color issue of OfficeMath equation edit boxes in Word dark mode.":"解决 Word 深色模式下 OfficeMath 公式编辑框阴影颜色问题","Forces Word to export PDFs with lossless image quality":"强制 Word 导出 PDF 时使用 100% 无损图像质量"};
  var KNOWN = ["Accent Color Sync","Restores Control Panel color opacity functionality","Accent Highlight Color","Makes the highlight color use your system accent color in Win32 apps.","Acrylic Color Glows","Animated light effects behind selected translucent windows","Acrylic Effect Radius Changer","Allows the user to change the Acrylic effect blur radius","Action Center on Active Display","Opens Action Center (Win + A), Cast pane (Win + K), and Project pane (Win + P) on the monitor where the mouse cursor is currently located.","Adaptive Microphone Icon Visibility","Hides the system tray microphone icon if only whitelisted applications have active access.","Add This PC and Desktop to Nav Top","Adds This PC and Desktop to the top of Explorer's nav","Aerexplorer","Various tweaks for Windows Explorer to make it more like older versions.","Aero Flip 3D Recreation","This mod recreates the classic Windows Vista/7 Flip 3D effect in modern Windows versions","Aero Flyout Fix","Applies thick borders to legacy system flyouts and make them float","Aero Tray","Restores Windows 7/8 tray overflow","After Effects Theme","Recolors the Adobe After Effects interface — panels, Timeline, viewers, window frame and menu bar — with a choice of very dark palettes.","Agenda in Calendar View","Show .ics events in the calendar of the Notification Centre, like in Windows 10","AI Voice Typing","Press a shortcut, speak, and your words are typed where the cursor is, in any app: transcribed and cleaned up by AI in your style (natural, professional, prompt) or translated, with a free key (Groq, Gemini, Mistral and more)","AltDrag","Move or resize any window by holding Alt and dragging it from anywhere, without having to grab the title bar or the borders","Alt+Tab window delayer","Delays the appearance of the Alt+Tab window, preventing flickering and reducing distractions during fast app switching","Alt+Tab Flip 3D (Vista Style)","Replaces Alt+Tab with a fluid, Windows Vista-style Flip 3D stack of live windows","Alt+Tab: Hide ghost windows","Hides windows in Alt+Tab that are too small or have no title, preventing \"ghost\" windows from cluttering the switcher. Can also hide inactive Groupy 2 tabs and/or minimized windows.","AltTab Mouse Focus","Moves the mouse cursor to the center of the window that gets focused after switching with Alt+Tab.","Alt+Tab per monitor","Pressing Alt+Tab shows all open windows on the primary display. This mod shows only the windows on the monitor where the cursor is.","Alt.Binz Dark Mode","Dark colors for the skinned user interface of Alt.Binz, with a custom surface color, gradients and colored progress bars","Always Allow CTRL+SHIFT+ENTER","Always allow CTRL+SHIFT+ENTER in the Run dialog","Always On Top Windows","Pin/unpin active window with Ctrl+Alt+T","AMD Radeon Software Window Fix","Forces the position, size, and maximized state of Radeon Software (RadeonSoftware.exe) every time its window is shown from the system tray. Optionally forces the startup page.","Animated Cross-Desktop Activation","Animates activation-driven virtual desktop switches and suppresses transient replacement-window switches.","Antigravity IDE Portable","Make Antigravity IDE portable by redirecting user data and extensions directories.","App Owned Frame","Restores DWM clipping for selected custom-frame applications without changing their window styles or resizing.","App Theme Crash Fixer","Prevents applications from crashing when using 3rd party themes by forcing default Windows themes or disabling visual styles per-app.","App Volume Booster","Boost the volume of chosen apps beyond 100%, with optional compressor mode and per-app overrides","Audio Hardware Volume Preset","Sets audio playback devices to a configured volume whenever they connect","Audio Output Device Switcher","Ctrl+Scroll on the taskbar to switch audio output devices","AudioSwap","Tray icon to cycle between multiple preferred audio outputs. Supports up to 6 devices with click or scroll to swap.","Auto Custom Titlebar Colors","Auto-switches titlebar dark/light mode with the Windows theme, with separate custom colours for active/inactive windows in both modes","Auto Refresh Rate","Automatically switch monitor refresh rates based on AC/battery power, fullscreen games, foreground apps, and docking.","Auto Theme Switcher","Automatically switch between light and dark appearance/wallpapers/themes based on a schedule with hotkey and custom script support","Auto Time Sync On Startup","Requests a Windows time synchronization when Explorer starts after sign-in.","Automatic WhatsApp Audio Ducking","Lowers the volume of chosen apps (e.g. Spotify) while WhatsApp or other apps play audio, then restores it","AutoScroll Win32","Enables browser-style middle-mouse autoscroll in Win32 applications. Compatible with Smooth Scroll Win32.","Background Dimmer","Dims unfocused windows with a solid tint, pattern or image, tuned live in a secondary configuration window","Balloon Sound Fix","Makes notifciation balloons play a sound again","Basic/Classic Theme Ribbon Fix","Remove the gap between the titlebar and the ribbon when using basic theme","Basic Themer","Applies the Windows Basic theme to desktop windows","Better Dialogs","Improves Windows dialog boxes.","Better Eject Dialog","Shows which programs are blocking a USB drive from ejecting, and lets you close them, eject automatically, or force-eject","Better Volume Mixer","A customizable volume mixer for master and per-app volume, right from the system tray","Block SMB Quick Access","Prevents SMB/UNC network paths from being added to Quick Access in Windows Explorer","Block Win+V","Blocks the Win+V keyboard shortcut (Clipboard History)","Block Start Menu and Hosts","Kills existing selected UI components on mod init and blocks any future launches.","Bluetooth Auto Toggle","Automatically cycles Bluetooth off and back on in milliseconds when a connected device is detected at startup","Borderless Fullscreen","Removes the window border of selected apps/games and resizes them to fill the monitor they're running on (or a fixed size)","Brave Acrylic","Alpha: Native Brave background transparency; requires Translucent Windows","BT Battery Monitor","Shows Bluetooth device battery levels in the system tray with battery overview","BubbleGlass Screensaver","Transparent soap-bubble screensaver after inactivity. GDI+ per-pixel alpha: desktop stays live beneath. Instant dismiss on mouse move or keystroke.","Bulk Copy File and Folder Names","Copy the names of one or many selected files and folders in File Explorer, not the paths, from the right-click menu or with optional hotkeys","Caffeine","Prevent your PC from sleeping or turning off the display with a simple tray icon toggle","Calendar Live Overlay","Display a customizable monthly calendar on the desktop behind icons.","Caps IME Switcher","Brings the macOS Caps Lock input source switching behavior to Windows.","Caption Buttons Customizer","Move the caption buttons to the left, reposition the window icon and title, and optionally draw macOS-style traffic lights (or your own button images).","CE Disable Process Button Flashing","Disables the flashing on the Open Process button in Cheat Engine","CEF/Spotify Tweaks","Various tweaks for Spotify, including native frames, transparent windows, and more","Center New Windows","Opens all new windows centered on the screen, including UWP and WinUI apps","Center Titlebar","Center align the text in titlebar","Change Explorer Default Location","Allows you to change what shell location or directory Explorer starts in.","Change Qt App Icon","Change the icon of all windows in a Qt app","Change Tray Icons","Change all tray icons for an application to a specific other icon","Charging Animation","Plays an animation, shows a battery stats card (optionally with sound) when the charger is plugged in or unplugged.","Charging Sound","Plays a custom sound when the laptop is plugged in or unplugged","Lunar & Holiday Calendar","Write your own text and colour into the Windows 11 calendar: holidays from an iCalendar (.ics) feed, dates matched by your rules, and optionally the Vietnamese lunar calendar","Chinese IME fixed mode","Forces Microsoft Pinyin IME to stay in Chinese mode","Chrome Context Menu Items","Hide, add, group, and reorder Chrome context menu items, restyle Chrome's menus, and tweak tabs and extension buttons","Middle-Click New Tab Chrome/Edge/Brave","Middle-click the empty area of the tab bar to open a new tab (Chrome/Edge/Brave)","Chrome Native UI Tweaks","Chrome PiP Alt+Tab Window Hider","Hides Chrome Picture-in-Picture windows from Alt+Tab and the taskbar.","Chrome UI Tweaks","Small UI tweaks to Google Chrome","Chrome/Edge scroll tabs with mouse wheel","Use the mouse wheel while hovering over the tab bar to switch between tabs","Chromium Cursor Remap","Replaces the low-resolution cursors that Chromium browsers and Electron apps draw for CSS cursors like grab, zoom-in and col-resize with your Windows cursor theme, or with your own .cur/.ani files.","Native titelebars in Chromium-based browsers","Restore native titlebars in Edge and Chrome","Chromium Frame Blackout Fix","Fix Basic/Classic frames going black in Chromium/Electron/CEF apps","Chromium Window Title Format","Customize how Edge and Chrome compose window titles - drop the browser suffix, restyle the tab count and profile, and rebuild the title from a template.","CJK Spacer","Add spaces between CJK characters and letters or digits in Explorer context menus and tooltips; modern XAML UI is opt-in and best-effort because it may conflict with other XAML Diagnostics mods","Fix browsers for Windows Classic theme","Forces the border from Aero Light theme to fix glitched border in Classic theme","Classic Clock Button Behavior","Makes the tray clock open the Date and Time CPL on double click","Classic Conhost [Deprecated]","Forces classic theme and optionally client edge on console windows","Classic Desktop Icons","Enables the classic selection style on desktop icons.","Classic Expand Buttons","Draws classic +/- expand buttons in Explorer","Classic Explorer Drag/Drop","Enables/fixes the classic drag/drop image in File Explorer.","Classic Explorer Drag-n-Drop Lite","Restores Drag & Drop image from Win 95 or Win XP in Classic theme","Classic Explorer Menubar","Turns off theming in Explorer menu bar","Classic Explorer Status Bar","Shows free disk space and file size info in the Explorer's status bar","Classic Explorer Treeview","Modifies Folder Treeview in file explorer so as to make it look more classic.","Classic File Picker dialog","Redirect the Windows Vista+ file picker to the Windows XP one","Classic List Group Fix","Makes the appearance of list group headers in classic theme like Windows XP.","Fix Classic Theme Maximized Windows","Fix maximized windows having borders that spill out onto additional displays when using the classic theme.","Classic Menus","Makes menus classic themed while keeping other controls themed","Classic Minimize/Maximize Animations","Restores the classic minimize/maximize animations used without DWM","Classic Notepad Multi-Step Undo/Redo","Adds multi-step undo/redo to classic Notepad instead of the single-step undo","Classic Windows Photo Viewer Redirect","Redirects image opening at runtime to the classic Photo Viewer (shimgvw.dll), without modifying the Registry","Classic Progress Bars","Reverts progress bars to how they looked in Windows XP and before","Classic Selection Rectangle Color","XP styled selection rectangle color","Classic Start Menu Folders Icon","Change the default icon of Start Menu folders like Windows XP and before","Classic Taskbar background fix","Fixes Taskbar background in classic theme by replacing black background with a classic button face colour","Classic Taskbar 3D buttons Lite","Lightweight mod restoring the 3D buttons in classic theme","Classic Taskbar 3D buttons with extended compatibility","Restoring the 3D taskbar buttons with support for visual styles and the taskbar without labels","Non Immersive Taskbar Context Menu","Restores the non-immersive taskbar context menu","Non-Immersive Taskbar Context Menu Lite","Restores the classic (non-immersive) taskbar context menus in Win10 taskbar","Classic Taskbar and Start Menu Properties","This mod recreates the classic \"Taskbar and Start Menu Properties\" dialog from Windows 7 (Taskbar, Start Menu, Toolbars tabs) in Windows 10 and 11.","Classic Task Dialog Fix","Fixes task dialog buttons in classic theme","Classic Theme","Disables theming (enables Classic theme)","Classic Theme Enable with extended compatibility","Enables classic theme. Supports Remote Desktop sessions and is compatible with early / system start of Windhawk.","Classic Theme Explorer Lite","Classic Theme mitigations for Explorer ported from Explorer Patcher","Classic Theme Explorer Search Fix","Fixes the appearance of the search box in Explorer with classic theme","Fix for Classic theme metrics on 24H2, 25H2, 26H2 builds 9444+","Syncs WindowMetrics of current user with default user at theme change and logon.","Classic theme transparency fix","Fixes transparency glitches in Classic theme","Classic Theme UIFILE Fix","Fixes Control Panel pages that don't display in Windows Classic theme","Classic This PC Item Sorting","Makes the sort order in \"This PC\" folder like in Windows XP and before","Classic Tray Keyboard Layout Indicator","Tray indicator for keyboard layout, similar to internat.exe from Windows 2000","Classic Tree View Expando Fade Fix","Fixes tree view expand and collapse buttons on the classic theme","Classic UWP Fix","Fix for UWPs breaking with Classic theme","Classic WebView Pane","Restores Explorer WebView with Windows 2000/98/Me layouts, file thumbnails, image viewing, metadata, classic disk charts and special folder actions","ClassicWindowSwitcher","Bring back the classic Alt+Tab dialog","Classic Winver","Allows you to restore the Winver dialog from various versions of Windows","Click on Empty Explorer","Configure double/triple click, middle click, double middle click, and modifier+click actions on empty space in File Explorer. Supports 17 actions including navigation, tabs, custom hotkeys, and invoking any right-click context menu entry.","Clientedge Everywhere","Adds 3D border (WS_EX_CLIENTEDGE style) to some windows to look better in Classic theme.","Smart Copy & Paste","Automatically format, clean, and enrich text instantly as you copy it to the clipboard.","Close Explorer on Esc","Press Esc in File Explorer to close the window; ignores rename and input fields.","Command Prompt Folder Larp","Make Command Prompt show different names for folders.","Coin & Stock Monitor","Shows stock and crypto prices on the Windows 11 taskbar, with a configurable price API, symbol list, colors and entry-price percentage","Color Picker Dialog Hex Input","Provides a hex input in the standard color picker dialog","Run command on window focus","Run a command on window focus matching a filter and optionally a command when not matching","Common Controls Hook","Force-enable Common Controls v6 visual styles for legacy Win32 applications","Compact Notifications","Replaces Windows notification banners with compact chat-style cards: avatar, sender and a few lines of text","Compact Start Menu","Cleans up the Windows 11 Start menu by showing only a compact, ungrouped All apps view.","Compiz Desktop Cube for Windows 11","Compiz/GNOME style 3D glass desktop prism for virtual desktops. Drag up from the taskbar to open it, turn it to switch desktops, right-click the screen edges to add or remove desktops. Live desktop, blurred background.","Confirm Closing Multiple Tabs in File Explorer","Shows a confirmation dialog when attempting to close a File Explorer window with multiple tabs open","Console Error to Ding","Replaces the error sound in console applications with the ding","Console Quick Paste","Injects a \"Quick Commands\" submenu into the right-click context menu of Windows PowerShell and Command Prompt.","Context Menu Preloader","Preloads and pins your context menu handlers into RAM to improve performance.","Control Panel Color Fix","For custom themes, fixes white header and sidebar in Control Panel","Control Panel in Modern File Explorer","Opens Control Panel in the modern Windows 11 File Explorer and groups it with Explorer on the taskbar","Control Panel Revival","Prevents Control Panel applets from redirecting to the modern Settings app on Windows 11 23H2+ by unhiding legacy elements safely","Copy File Contents","Copies a selected file's text or its SHA-256 hash without opening it in an app, from a keyboard shortcut or the right-click menu.","Copy Queue","Queues Explorer copy operations while keeping them visible in the normal copy dialog","CoverTabby","An animated Alt+Tab switcher with live previews and multiple layouts","Control Panel Classic View Lite","Makes the Control Panel folder to appear as any other","Crazy Time","Schedule shutdown, sleep or hibernate from a tray icon, with warnings and weekly repeats.","CrystalDiskInfo Smart Auto-Refresh","Temporarily pauses the Auto-Refresh function while the application's main window is visible","Ctrl+Backspace Fix for Win32 Text Boxes","Makes Ctrl+Backspace delete the previous word in Win32 text boxes instead of inserting a control character","Cursor auto-hide on idle","Hides the mouse cursor after a configurable idle timeout and shows it again as soon as the mouse moves or a button is clicked","Cursor Idle Fade","Fades the mouse cursor out after a period of inactivity and brings it back the instant the mouse moves","Cursor Motion Blur","Adds high-speed cartoon motion blur to your mouse pointer.","Cursor Override","Recognizes supported cursors by image and hotspot and loads replacements on demand","Simple Cursor Trail","A fully customizable cursor trail for the Windows desktop.","Custom Cached Context Menu","Instantly-opening cached Explorer context menu that is fully customizable: themes, layout, colors, animations, rules, and custom commands.","Custom Command Prompt Startup Text","Replace the version and copyright text that shows","Custom Window Corner Radius","Customizes window corner radius in Windows 11, making corners more or less rounded","Custom Desktop Watermark","Lets you set your own desktop watermark text","Custom Menu Height","Control the height of Win32 context menu items and menu bars","Custom Shutdown Dialog","Override the classic shutdown dialog in Explorer with your own","D3D9 Flip Model Upgrade","Upgrades Direct3D 9 games to D3D9Ex with a FLIPEX swap chain so windowed/borderless games can reach Independent Flip","Dark mode context menus","Enables dark mode for all win32 menus.","Fix browser and Teams text colors in dark mode","For dark theme users, fixes unreadable web sites with bright text on white background or black text on dark background. Likewise fixes Teams document viewer's text colors.","DeepSeek Balance in Taskbar","Shows the current DeepSeek API account balance next to the taskbar clock","Adjustable tray icons padding for Win10 taskbar","Makes padding of tray and tray popup icons adjustable in legacy taskbar","Desktop Audio Visualizer","Real-time audio visualizer on your Windows desktop with customizable appearance","Desktop Disk Icon","Displays external storage devices as native desktop icons","JonaOS Draggable Desktop Widgets","Interactive desktop widgets with shortcuts to Wi-Fi, Hotspot and Bluetooth quick settings, music playback controls, live state indicators, and a one-click system-wide light/dark mode toggle.","Desktop Icon Arrangement","Preserve existing desktop icon positions and place new icons in free columns to the right.","Desktop Icon Dock","A standalone macOS-style dock: drag shortcuts, files and folders onto it, reorder them, drag them out to put them back on the desktop; shortcuts are copied into a dock-owned folder so desktop cleanups do not affect the dock; optional glass panel","Desktop Icon Section Auto-Hide & Fluent Hover Reveal","Auto-hides desktop icons with zero wallpaper dimming. Features 60 FPS Fluent alpha fade, per-app pinning whitelist, 4-state modes, multi-anchor detection, middle-click toggle, peek mode, and drag/rename shields.","Desktop Icon Selection Style","Restyle the highlight behind selected desktop icons - size, transparency, rounded corners, glow, and a solid, dashed or dotted border","Desktop Icon Ticker","Show live scrolling or static text (time, date, CPU, RAM, disk, battery, Recycle Bin...) on top of desktop icons","Desktop Icons Transparency","Adjusts the opacity of desktop icons and text labels without darkening the wallpaper","Desktop icons view","Change desktop icons view to list, details, small icons, or tiles","Desktop Live Overlay","Display live, customizable content on the desktop behind icons. Perfect for showing time, date, system metrics, weather, and more.","Desktop Marquee Fade","Adds a smooth fade-out animation to the desktop selection rectangle when you release the mouse button.","Desktop No View Menu","Removes the \"View\" menu from the desktop context menu","2D Rectangular Selection for Desktop","Bring 2D rectangular selection to desktop icons, similar to Excel.","Easy Notes","Sticky notes that live on the desktop, with checklists, clickable links, auto-numbering and a snapping column grid","Desktop Watermark Tweaks","Tweaks for the desktop watermark","Desktop Window Cards","Minimized windows fall onto the desktop as dimmed thumbnail cards you can restore or close","Disable Windows Audio Limiter","Disables built-in Windows Audio Limiter (CAudioLimiter)","Disable Feedback Hub Hotkey","Disables the feedback hub (Win+F) hotkey in Windows","Disable Folder Thumbnails","Disable folder thumbnails while preserving file thumbnails.","Disable Immersive Context Menus","Disables immersive context menus in File Explorer","Disable Inactive Menubar Greying","Prevents menubar text from being greyed out in inactive folder windows in Classic theme","Disable Microsoft Teams hotkeys used by Visual Studio","Disables Ctrl+Shift+Space that does something useful in Visual Studio and not in Teams.","Disable Navigation Bar","Disables the navigation bar in file explorer","Disable Office Hotkeys","Disables the office hotkeys (Ctrl+Shift+Alt+Win combinations) in Windows","Disable accidental Office KeyTips in Word","Prevent accidental yellow Office KeyTips activation in Microsoft Word during layout/language switching and stray Alt-like transitions","Disable Window Open/Close Animations","Disables Open/Close animations without affecting other window animations.","Disable rounded corners in Windows 11","A simple mod to disable window rounded corners in Windows 11","Disable Task Manager Navigation Border","Disable Task Manager navigation and generic focus borders.","Disable Thumbnail Minimum Size","Disables the cutoff size used to display thumbnails in File Explorer.","Disable Tray Icons","Disable all tray icons for a specific application","Disable Virtual Desktop Transition Animation","Disables the animation when switching between virtual desktops on Windows 10 and Windows 11.","Disable Voice Access Hotkey","Disables the Voice Access hotkey in Windows","Disable Windows Shortcuts","Selectively disable Windows keyboard shortcuts with individual toggles","Discord Balloon Notifications","Converts Discord toast notifications to classic Windows balloon notifications","Discrete Touchpad Wheel","Converts continuous precision-touchpad (or high-resolution mouse wheel) scrolling into discrete mouse wheel events for legacy apps that ignore the scroll magnitude and scroll uncontrollably fast","Disk Pie Chart","Makes the graph in disk properties a pie chart again","Disk Usage Bar Color","Customize the disk usage bar color in File Explorer This PC view","Disk Usage Bar Customizer","Customize everything about the disk usage bar from the This PC section in the File Explorer, including theme-aware colors, height, border, rounded corners and more.","Disk Usage Bar in Drive Properties","Replaces the pie/donut chart in drive properties with a usage bar","Dot Hide","Keep dot files and directories out of sight, Because it wouldn't happen in Linux...","Drag to Delete","Drag files onto a floating target to move them to the Recycle Bin.","Drag to Scroll","Hold Ctrl + Right-Click (or pure Right-Click) and drag to scroll smoothly across browsers, documents, editors, and File Explorer—with flick speed boost and hands-free cruising.","Dropbox: Reduce Explorer CPU usage on sync","In Dropbox, disable SHChangeNotify calls to avoid Explorer slowdowns and high CPU usage from per-file overlay updates during large syncs.","DWM Custom Projection Border","Customize or disable the yellow border drawn by DWM when a capture is started using WinRT","Windows SDR to HDR Tonemapping Fix","Replaces DWM's sRGB EOTF with a pure power-law gamma for SDR-to-HDR tone mapping","DWM Ghost Mods","Allows you to use basic or classic theme with your DWM ghost windows and more!","DWM Unextend Frames","Makes applications think DWM is disabled","DirectWrite Font Fallback Override","Intercepts DirectWrite font fallback to replace fonts for specific characters","DXGI Flip Model Upgrade","Forces the DXGI flip model and tearing support in Direct3D 11 and 12 games, so windowed/borderless games can reach Independent Flip and run uncapped with VSync off","Dynamic Island for Windows","A living, breathing pill overlay inspired by iPhone's Dynamic Island. Reacts to media, downloads, clipboard, battery, and more.","Dynamic Taskbar Transparency","Dynamically changes the Windows 11 taskbar XAML background transparency for desktop, Start, search, tray flyouts, task view, and maximized windows.","DynamicDock","For Ultrawide Monitors: Force the taskbar to follow your mouse when it touches the edge and your icons will be centered on your mouse. Works with default and modded taskbars.","Double-Click Window Edge to Maximize Width","Double-click the left/right window edge to maximize the width (a corner maximizes both axes); the top/bottom edge keeps Windows' built-in vertical maximize","Edge Hot-Corners Desktop Switch","Switches virtual desktops when the mouse hovers at the left or right screen edge for a moment.","Edge Native UI Tweaks","Use Windows folder icons for Favorites and restore Edge's classic yellow folder icons.","Edge Snap Throw","Slide a window into a screen edge and it snaps like native Windows snap","Prevent Edge from lagging your Taskbar process","Blocks Edge window Alt-Tab manager","Energy Saver Power Plan Link","Links Windows 11 Energy Saver with the Power Saver power plan and restores the previous plan when disabled.","Enhanced Disk Usage","Enables the ability to customize the disk drive tiles in explorer, targeting the disk's usage bar, as well as the details that appear below.","Enlarged Icons Without Thumbnail Frames","Takes small icons out of the white thumbnail frame of Explorer's large icon views and enlarges them to the size of the view without blur (classic SysListView32 file list); folders and shortcuts get icons instead of thumbnails","ExplorerPatcher Taskbar Button Width","Customize the minimum width of taskbar buttons when using ExplorerPatcher's Windows 10 taskbar","Eradicate Immersive Menus","Gets rid of immersive menus system-wide","Excel Wheel Sheet Navigation","Scroll the sheet tab strip with the vertical wheel and switch sheets with the horizontal wheel","Expanded Clipboard (Win+V)","Raises the 25-item cap of Windows clipboard history (Win+V) and lifts the per-item / total buffer size limit so large images stick.","Explorer 32px Icons","Makes the \"Medium icons\" view in Explorer 32px again","Explorer Backspace Navigation","Go up with Backspace, or keep history navigation with a parent-folder fallback for missing folders","Explorer Breadcrumb Middle-Click New Tab","Opens folders in a new tab by middle-clicking breadcrumb items and their dropdown menus (Linux style).","Explorer Column View","Browse folders in Finder-style columns with keyboard navigation, file previews, and inline audio and video.","Explorer Command Bar","Customize the Windows 11 File Explorer command bar with commands, menus, New+, and a shell context-menu button","Classic context menu on Windows 11","Always show the classic context menu without having to select \"Show More Options\" or hold Shift","Explorer Context Menu Custom Items","Adds filtered custom user-defined options to the classic (Show more options) context menu.","Use Ctrl+N in File Explorer to create a new file in the active folder or tab.","Explorer Ctrl+N to New File","Explorer Ctrl+Q to New Folder","Press Ctrl+Q in Explorer and create a new folder in current path, including desktop.","Explorer Custom Shortcuts","Customizable keyboard shortcuts for File Explorer: open terminal, copy paths, create files/folders, toggle hidden items, and launch apps with hotkeys.","Better file sizes in Explorer details","Enhances file size display in Explorer details with folder sizes, human-readable units (MB/GB), and optional IEC notation (KiB/MiB)","Explorer Double Click Up","Double click empty space to go up a folder","Select filename extension on double F2","When pressing F2 in Explorer to rename a file, the filename is selected as usual, but double-pressing now selects the extension. Triple F2 selects the full name, quadruple F2 selects the base name again, etc.","Explorer Folder Bookmarks Bar","Adds a folder bookmarks bar under the address bar of Windows 11 File Explorer.","Folder Hover Menu","Hover a folder in File Explorer to get an expand button that opens a cascading menu of the folder's contents","Explorer Font Changer","Comic Sans anybody? Change your GDI fonts at will! Also, gloooowy!","Explorer Details View Columns","Forces a fixed set of columns, and optionally sorting, in File Explorer Details view. Columns and their order are configurable. Has no effect on other view modes.","Classic Explorer navigation bar","Restores the classic Explorer navigation bar to the version before the Windows 11 \"Moments 4\" update","Explorer Glyphs Colorizer","Customize the blue details of File Explorer glyphs without changing the original files","File Explorer Focus Border Remover","Removes the white focus border around selected items in File Explorer while preserving the normal selection highlight.","File Explorer Address Bar Home Button","Adds a dedicated \"Home\" (This PC) button next to the Refresh button in the Windows 11 File Explorer address bar","Explorer Info Bar+","Enhances File Explorer's bottom info bar with drive, content, selection, and single-file details, with customizable styles and colors.","Large Icons View for File Explorer","Keeps File Explorer folders in Large icons view, with a configurable icon size.","Name explorer windows","Assign custom names to explorer windows, just like in Chrome","Explorer Nav DragOver Fix","Stops File Explorer's nav pane from jumping when a folder auto-expands during a drag, restores mouse-wheel scrolling during drag, accelerates edge-scroll, and optionally collapses drag-opened folders when the drag ends","Explorer Navigation Tree Offset","Adjusts the Explorer navigation tree offset and optional tree view visual styles","Disable Middle Click New Tab in Explorer","Makes the middle mouse button do nothing in File Explorer, instead of opening folders in a new tab","Explorer No Minimum Window Size","Removes the minimum window size restriction in File Explorer","Explorer Unlocked Toolbars Fix (WINAPI)","Removes bottom gripper from unlocked Explorer toolbars without the need to download symbols","Explorer Open Folder Icon","Restores the open folder icon in Explorer's icon and tree view","Explorer Picker","Replaces the Open, Save As and folder picker dialogs of every program with a real Explorer window that has a File name / Files of type bar at the bottom","Explorer Properties Button","Add a Properties button to the Windows 11 File Explorer command bar, between Delete and Sort, opening the properties dialog of the current selection","Explorer real folder paths","Open filesystem-backed Shell shortcuts through their actual paths","Explorer Rename Overwrite","When renaming a file in Explorer to a name that already exists, overwrite the existing file instead of being blocked by the \"file already exists\" prompt.","Explorer Single Window Tabs","Redirects new File Explorer windows to open as tabs in a single existing window","Size on disk column in Explorer details","Adds a \"Size on disk\" column to File Explorer's details view for files and folders","Explorer Status Bar Metadata","Appends rich metadata (dimensions, date, type, duration, bitrate, fps) to Explorer's status bar. Zero polling — purely reactive, path-keyed cache.","Steam Games in Explorer","Your Steam games in the File Explorer navigation pane: launch, open folders, playtime, collections (Epic, GOG and Xbox experimental)","Explorer Tab Router","Reuse and activate Explorer folder tabs, preserve file selection and explicit new windows","Explorer Tab Utility Window Hider","Hides the Explorer Tab Utility window completely, allowing it to run only in the background","Explorer Tabs Session Saver","Saves and restores Explorer tabs when reopening","Explorer Tags","Colored tags panel at the bottom of File Explorer's navigation pane, plus a Tags submenu in the file context menu","Folder thumbnails on taskbar buttons","Each File Explorer taskbar button shows a preview of the folder it has open, the way that folder looks in Explorer's own icon view","Explorer Taskbar Overlay Icon","Shows an overlay icon on the taskbar of Explorer windows that displays the icon of the current directory.","File Explorer Terminal Admin Aliases","Launch elevated or custom terminals (cmd, Windows Terminal, PowerShell) directly from the File Explorer address bar with configurable aliases.","Explorer Title Bar Label","Add custom text, date and time to the Windows 11 File Explorer title bar.","File Explorer Toolbar Links Item","Restores the ability to display the hidden \"Links\" toolbar in Windows 10 and 11.","Separators around File Explorer toolbars","Adds separators around File Explorer toolbars","Expand folder on click (Explorer nav pane)","Left click expands a folder one level; Ctrl+click collapses the whole tree; Alt+click expands all subfolders","Explorer TreeItem Tweaker","Custom backgrounds and text colors for Explorer TreeView","Explorer TreeLine Killer","Hide navigation pane separator lines and control upper/lower spacing in Explorer","Explorer Unlocked Toolbars Fix","Removes the splitter that shows up with unlocked toolbars in Explorer","Ctrl or middle-click on explorer up-button opens parent in a new window or tab.","Explorer Visual Tweaks Dark","Explorer selection, progress, and Preview Pane visual tweaks","Explorer List Zebra Stripes","Add stripes for Details and List items in File Explorer","Explorerframe fixes for Win11 22H2+","Fixes three problems with file explorer","Turn off change file extension warning","When a file is renamed and its extension is changed, a confirmation warning appears, this mod turns it off","F1 Blocker","Prevent F1 from opening the help page in File Explorer and/or other selected applications","Fake Explorer path","Allows to run explorer.exe in taskbar mode from any location","Fake High Contrast","Fake High Contrast status for apps","Fancy Task View Cross-Monitor Drag","Move windows between monitors from Windows 11 Task View","FancyZones Win+Shift/Ctrl+Arrows Hotkey","Makes FancyZones override Win+Shift/Ctrl+Arrows instead of Win+Arrows","Fast Backspace","Delete faster while holding Backspace, with a configurable repeat multiplier","Faster Virtual Desktop Switching","Removes the long pre-animation lag caused by oversized wallpaper thumbnail requests on Windows 11.","Favorites in Navigation Pane","Replaces Windows 10 Quick Access with Favorites in Navigation Pane","File Explorer WinUI-Like Content Animation","Smooth WinUI-like page transition animations for the File Explorer content area.","File Explorer Details Auto-Fit Columns","Automatically fits all column widths to their content when refreshing in Details view. Has no effect on other view modes.","Remove Taskbar Window Suffixes","Remove suffixes from taskbar window titles for File Explorer and other programs, or configure custom text replacement rules","File Explorer Reopen Closed Tab","Reopens the last closed Explorer tab when Ctrl+Shift+T is pressed in an active Explorer window","File Hover Info","A themeable info card with size, dates and more when you hover files on the desktop or in File Explorer","File Operation Styler","Portable custom presentation for native Explorer file operations with a skin-safe unified presentation.","Files 2 Folders","Move or copy one or more selected files in Explorer into a subfolder (named — nested paths with \"/\" supported, by extension, by name, or by date), with a workaround hotkey for other file managers","Firefox border fix for Classic theme","Mitigates Firefox bug 1950145 (glitched window borders in Classic theme)","Disable Firefox Picture-in-Picture Always on Top","Removes the always-on-top behavior from Firefox PiP windows","Fix 11's notifications crash in Win10 taskbar under Win11 24H2+","Stops notifications from crashing explorer","Fix Basic Caption Text","Fixes non-DWM and UIRibbon frames having incorrect caption colors","Fix File Conflict Dialog Checkbox Background","Fixes black background on the checkbox in the file conflict dialog (Classic Theme)","Fix Darkmode ListViews","Fixes ListViews in dark mode","Fix Explorer Row Right-Click","Fixes right-clicking on empty row space opening the folder background menu instead of the file menu.","Fix white flashes in explorer","Removes the annoying white flash when opening Explorer tabs.","File Explorer Toolbar Position Fix","Fixes issue with explorer toolbars not setting the position correctly","Fix language indicator in Win10 taskbar under Win11 24H2+","Fixes text orientation in the keyboard layout indicator in Win10 taskbar running under Win11 24H2+","Fix missing taskbar icons after sleep","On resume from sleep or hibernate, momentarily pulses the taskbar height by 1px and reverts it, forcing a re-layout that brings back icons that go missing on wake (Windows 11)","Fix Qt scrollbar grippers","Fixes scrollbar grippers in Qt 6.1+","FixStrips WH Port","Port of the fixstrips AHK script that fixes some classic theme issues with Explorer7","Fix Task Manager Details Icon Size","Fix task manager details icon size to normal.","Fix Windows Tools Folder View","Saves/restores view mode for Windows Tools folder","Flashlight Desktop Icons","Make desktop icons semi-transparent or invisible when idle, and reveal ONLY the icons near the mouse cursor within a customizable radius. Works flawlessly with Wallpaper Engine.","Flexible Explorer Toolbars Deluxe","Makes Search Bar, Address Bar, Breadcrumb Bar and others into movable toolbars","Flight Simulator window focus helper","Makes the game window active on mouse hover and inactive on mouse leave","Fluid Wallpaper","Animated GPU fluid simulation wallpaper with autonomous motion, mouse interaction and per-monitor rendering","Folder Thumbnail Style Switcher","Switch Explorer folder thumbnails between Windows 7, Windows 10, and Windows 11 styles.","Force Chinese IME Mode Legacy","Force Desktop Icon Spacing","Set the desktop icon grid spacing (X/Y) and reserve a blank margin above the taskbar. Event-driven and DPI-aware, with a short startup icon-count check; the original spacing and height are restored on unload.","Force Kill Active Window","Press Ctrl+Alt+F4 to forcefully kill the active foreground window.","Force System Cursor","Replaces game custom cursors with the system default cursor or a built-in custom cursor, while allowing cursor hiding to work normally.","Force thick frames","Force windows to have thick frames like in Windows Vista/7","Fullscreen Start (Launchpad style)","Replaces the Start menu with a fullscreen grid of all apps, with search and an adjustable blurred background","Fully Customizable WinVer","Fully customize your winver.exe by even \"replacing\" the logo!","Move and Gather Windows","Move or gather windows with global hotkeys and remap numbered shortcuts to the intended displays","Genie Animation Mod","Definitely not inspired from MacOS.","GNOME-like dynamic virtual desktops","Makes the Windows 11 virtual desktop system behave like the GNOME desktop environment","GPU-accelerated explorer.exe list and grid views","GPU-accelerated list and grid views replacement for explorer.exe. Includes smooth scrolling and interactive animations","Skip harmful files confirmation","Skips the harmful-files confirmation when dragging files in Explorer.","Hide Action Center icon","Hides Action Center icon from Win10 taskbar","Hide Desktop Icon Text and Shortcut Arrows","Provides options to hide icon text labels (keeping folder names) and remove shortcut arrow overlays on the desktop.","Hide Dotfiles (Explorer only)","Hide dotfiles and folders starting with . in Windows Explorer and Desktop","Hide Empty Optical Drives","Hide empty CD/DVD/BD drives from This PC while keeping the drives fully available to Windows.","Hide Extension during renaming","Hides file extensions in \"Save As\" dialogs and during File Explorer/Desktop renaming.","Hide Home, Gallery & OneDrive in Explorer","Hides the \"Home\", \"Gallery\", and \"OneDrive\" items from File Explorer's navigation pane on Windows 11. Also supports hiding user-specified custom labels.","Hide Scrollbars","Hide vertical/horizontal scrollbars in selected processes (default: File Explorer) and reclaim the gutter space","Hide Search Bar","Removes the search bar that is next to the file explorer","Hide Start Button","Hides the start button from the taskbar (Windows 11 only). The start menu can still be opened via keyboard or touchscreen.","Hide Taskbar Only on Desktop","Hides selected taskbars when their displays are desktop-only or in detected fullscreen","Hide Taskbar Tooltips","Suppresses native Windows 11 XAML hover tooltips in Explorer, with selective area filtering and optional hover delay tuning.","Hide Titlebar Icon and Text","Hides certain elements in window titlebars","Hide Network UNC Paths in Explorer","Removes UNC paths from network drives in Explorer and dialogs","Hold Teams meeting thumbnail in place","Prevent Teams from periodically rearranging the meeting thumbnail window","HotCorner Hotkeys","Assign up to 9 distinct actions per hotkey, dispatched based on which screen zone the cursor is in when pressed (4 corners, 4 edges, or elsewhere).","Hourly Peek Buddy","A fun reminder for the top of every hour or at the times you choose: a funny little character pops up from the bottom corner of your screen, on top of all your apps, with a speech bubble and a preview in the settings","Hover Text Magnifier (macOS-style)","On-cursor hover bubble with large text via UI Automation; optional pixel magnifier fallback.","HWiNFO Registry Live Overlay","Displays HWiNFO sensor values from the Registry as a lightweight desktop overlay.","Hyprland Windows","Hyprland-style window handling: move, resize, maximize and close windows with Win + mouse from anywhere on them, hide title bars, color window borders, and go round the virtual desktops with Win+Tab","Icon Customizer","Allows you to override almost 100 built-in Windows icons.","Resource Redirect","Define alternative files for loading various resources (e.g. icons in imageres.dll) for simple theming without having to modify system files","Icons of Win16 apps in Explorer and file dialogs","Adds support for icons of 16-bit (Win16) applications in File Explorer and file dialogs","IDA Aliased Fonts","Fix up aliased font rendering in IDA 9.x.","IDM Clear Completed Downloads","This mode cleans up as soon as the IDM window appears on the screen.","Ignore Focus Loss","Make games believe they're always on top","IME Native Mode Lock","Forces supported IMEs to stay in their native input mode, preventing accidental mode switches.","Instant Taskbar Thumbnail Previews","Controls taskbar thumbnail preview show and close behavior.","Internet Status Indicator","Real-time network connectivity monitoring with visual indicators as a Tray Icon","Invisible Window Borders","Makes window borders invisible while keeping rounded corners","Island Media Controls","Dynamic island-like media controls for the Windows 11 taskbar.","SecureBoot Warning Watermark Enabler","Enables the normally hidden \"SecureBoot isn't configured correctly\" watermark","Keep Rainmeter Always on Desktop","Keeps Rainmeter windows to stay on desktop.","Keep Windows Clear of Taskbar","Keeps normal app windows from opening, restoring or being dragged under the taskbar, on any screen edge","Key Click","Produces click sound on keypress, supports autorepeat","Keyboard Shortcut Actions","Trigger custom actions with global keyboard shortcuts (hotkeys): show desktop, mute volume, open Task Manager, media controls, and more","Language Applet Restorer","Brings back the Control Panel \"Language\" applet on later versions of Windows downloading the original files from Microsoft's symbol server","Language Switcher Position","Customize the Windows 11 26H2 language switcher position with alignment and X/Y coordinates.","Legacy Alt+Tab dialog","Enables legacy Alt+Tab dialog from Windows XP and Windows 2000","Legacy XP-style balloon notifications","Enables legacy XP-style ballon notifications for Win10 taskbar","Legacy (Win32) clock flyout (Win11-friendly)","Restores the Win32 tray clock flyout.","Legacy File Copy","Restores the Windows 7 file copy dialog","Legacy (Win32) power flyout","Enables legacy power flyout on Win10 taskbar","Legacy Search Bar","Restores the search box from before Windows 10, version 1909","Legacy Shell Message Boxes","Makes ShellMessageBox use message boxes rather than task dialogs","Legacy (Win32) sound volume flyout","Enables legacy sound volume flyout on Win10 taskbar","Lid Close Sleep Delay","Delays system sleep after laptop lid is closed by a configurable time (30s, 1min, 5min, 10min)","Lines in MMC and Device Manager","Adds dotted lines to the TreeView in Microsoft Management Console and Device Manager","Live Update for Windows 11","Live taskbar activities: media, Windows Clock, battery, tasks, recording, displays, hotspot, privacy and lunar almanac","Live Video Wallpaper","Play MP4 videos as your Windows desktop wallpaper using hardware-accelerated Media Foundation rendering with a built-in runtime performance profiler (`Ctrl+Alt+D` to toggle HUD).","Close WinDbg's file changed dialog","Automatically rejects (or accepts) the dialog from WinDbg telling that a file is changed","Play-Media-Key fix in Explorer","Fix the Media 'play' key being suppressed in Explorer when a file is selected.","Fix PPEE/ResourceHacker Wow64 filesystem redirection","Disables Wow64 filesystem redirection when loading a file in PPEE or ResourceHacker","Multi-instance regedit","Allow multiple instances of regedit","Enable VMPlayer's VNC","Enable the builtin VNC in VMWare Player","Visual Studio Solution Icon","Add an icon overlay on the Visual Studio task bar icon","Lock Keys Notifier","Shows a customizable toast when a lock key (Caps/Num/Scroll/Insert) is toggled","Lock Screen Clock Styler","Customize the Windows 11 lock screen clock with modern styles, date display, and widget controls.","Lock Screen Live Wallpaper","Play a video as the lock screen and password screen background","Lock Screen Date and Time Format","Changes how the lock screen shows the time and date: vertical or horizontal clock, 12/24-hour, custom separator, and date formats","Logon, Logoff & Shutdown Sounds Restored","Restores the logon, logoff and shutdown sounds from earlier versions of Windows","Low Battery Alarm","Plays a customizable alarm when a laptop battery reaches a low or critical charge level","Mac Island & Dock","An island at the top of the screen like the macOS menu bar and the iPhone's Dynamic Island (clock, control center, notifications, media, tray icons), and a macOS-like dock instead of the taskbar (or the Windows taskbar, transparent or as it is)","macOS magnifying cursor","Recreates the macOS \"Shake to Find\" feature by enlarging the cursor when rapidly moved.","Enter to Rename in File Explorer","Rename selected files and folders with Enter, like in macOS Finder.","MacOS Minimize Animation","Smooth macOS-style genie minimize, restore (open) and optional close animations for every window.","MacOS Style Dock","Turns the Windows 11 taskbar into a macOS-style dock with magnifying icons","Magic Mouse","Draw custom mouse gestures to trigger actions like launching apps, toggling desktop icons, fullscreen, and more. Record gestures via an on-screen canvas, then replay them with a configurable modifier key.","Magic Pointer","Shake the mouse cursor to summon a Googlebook-style Magic Pointer, then point at or select anything on screen and ask Gemini, ChatGPT or Claude about it","Magnifier Headless Mode","Blocks the Magnifier window creation, keeping zoom functionality with win+\"-\" and win+\"+\" keyboard shortcuts.","Adds a magnifier window you can customize and dock at the top, bottom, left, or right of your screen and more.","Maintain colour temperature of f.lux","Keeps your preferred f.lux colour temperature settings, eliminating automatic changes","Maximized Window Margins","Leaves a configurable gap around maximized windows and between snapped windows, macOS style","Menu/Tooltip Slide Animation","Makes menus and tooltips slide into view","Global Hotkey Mute Microphone","Global hotkey to mute/unmute the default microphone, with a floating always-on-top overlay that animates while the mic is active. Optional: show-only-when-muted, mod on/off hotkey, red screen border, all-monitor overlay, mute all microphones","Mic Tray Control & Decibel Viewer","Adds a microphone icon to the tray. Scroll to change volume, right-click for a mixer!","Micrographics Taskbar Clock","Replaces the Windows 11 taskbar clock with a Nothing OS 5 \"Micrographics\" style clock: pill badges, a block cursor and a weather line","MicroManager","Mini task manager tray icon showing CPU, GPU and RAM usage with top consumers.","MicSwitch","Tray icon to cycle between multiple preferred microphones. Supports up to 6 devices with click or scroll to swap.","Middle Click New Tab","Middle-click the empty tab strip area of File Explorer, Notepad or Terminal to open a new tab","Minecraft launcher region detection spoof","Spoof process region signals for PCL CE and HMCL.","Minimize to tray","Right-click a window's minimize button to hide it in the system tray.","Mix Files and Folders When Sorting in Windows Explorer","Interleave files and folders when sorting Explorer by any column, instead of always grouping all folders before (or after) all files","MMC Dark Mode","Dark theme for the console snap-ins: Device Manager, Event Viewer, Services, Task Scheduler and Disk Management.","Mobile Open Animation","App windows zoom open from the icon (cursor position) with a fade, phone-style, using a splash panel with the app icon.","Redirect Modern Notepad to Classic Editor","Redirects Windows 11's Notepad to a configurable classic editor (defaulting to classic notepad), useful to keep the default \"Edit in Notepad\" context menu item. Allows auto-elevation using Ctrl+Shift.","Modern Run Dialog UI For Windows 10 & 11","Replaces the classic Win + R dialog with a modern Liquid Glass / Fluent UI, custom image/video backgrounds, and quick settings.","Modernize Folder Picker Dialog","Replaces the classic \"Browse For Folder\" dialog","Mond Desktop Clock","A universal desktop clock widget with configurable typography, layout, and placement.","Monitor Rounded Edges","Applies smooth, anti-aliased rounded corners to all monitors via Direct2D. Supports circular and squircle (superellipse) styles, with an optional inner accent border and fullscreen awareness.","Monitor Sleep Button","Tray icon to turn off the monitor after a configurable countdown.","More space in language indicator","Enables to see two lines in the language indicator with small taskbar icons (Windows 10)","Mouse Button Remapper","Remap mouse buttons (side, middle, left, right) to keyboard keys with optional modifiers, double-click actions, a master toggle hotkey and game mode","Mouse Cursor Themes","Replaces the Windows mouse cursors with built-in themes (neon, classic, sunset, ocean, gold, rainbow and more) that are drawn by the mod itself, including animated busy cursors and several pointer shapes (arrow, triangle, diamond, dot and more)","Mouse Trail","A highly customizable mouse trail effect.","Move Conflicts Quietly","Automatically keeps both items when Explorer copy or move operations hit a name conflict, without showing the replace/skip prompt.","Move Window to Monitor","Moves the active window to a specific monitor using configurable hotkeys (default: Ctrl+Alt+Arrows)","Message Box Fix","Reverts message boxes to their behavior from before Windows 10 1709","MSHTML Tweaks","Various tweaks for the IE engine, including old control styles and font AA options","Dark Paint","Forcing dark mode in the new Microsoft Paint","Multi-DPI Cursor","Keeps the mouse cursor the same visual size across monitors with different display scaling","Multi PrintScreen","Paste several screenshots one by one with a repeated Ctrl+V (FIFO). Works in every app. No Win+V menu, no AutoHotkey.","MultiWM","Lightweight, low-cortisol window manager with true per-virtual-desktop layouts.","Mute Focused Window","Press a hotkey to mute or unmute the audio of the window that currently has focus","Mute in Background","Automatically mutes the program when it goes to the background and restores it when it returns to the foreground.","MuteAlert - Microphone Activity Taskbar Widget","Shows live microphone activity, call mute state, volume controls, and headset mute synchronization in the Windows 11 taskbar.","Native Brightness Shortcut (Always On Top)","Use CTRL + ALT + UP/DOWN to change brightness. Runs in a dedicated stable windhawk.exe process (Tool Mode).","Windows Shadows Tuner","Adjust the size, blur and intensity of native Windows shadows.","Remove UWP titlebars","Enables native titlebars in UWP apps","Desktop Audio Visualizer Plus","A highly customizable audio visualizer with synced lyrics, media controls and EQ, featuring optional network access to fetch lyrics from lrclib.net","Desktop Companions","Spawn multiple animated characters (neko cat, sakura, and tomoyo) on your screen that interact with your windows and follow your cursor.","Nested Tray Drawer","Collect rarely used tray icons in a second drawer.","Taskbar Network Speed Indicator","A free-floating network speed widget you can place anywhere along the taskbar, featuring a sparkline chart and multiple layouts.","Net-Toggle","Internet kill switch with primary/secondary DNS monitoring in your system tray","Never Auto-Expand Explorer Tree Items","Stops the unwanted auto-expansion of navigation pane items even if the \"Expand to current folder\" option is off","Nilesoft Shell Animator","Adds customizable animations to Nilesoft Shell.","Nilesoft Text Shrinker","Forces menu text to be small regardless of icon size.","NoFlashWindow","Prevent programs from flashing their windows on the taskbar","No Focus Rectangle","Removes the focus rectangle","No Hidden Cursor","Prevent programs (and games) from hiding your cursor","No icon MessageBox Sound Restore","This mod restores the sound effect that plays when a MessageBox without an icon pops up.","No Properties Icon","Removes the window icon from property sheets like previous Windows versions","No Run Icon","Removes the window icon from the Run dialog, like Windows XP and before.","No SumatraPDF Drag Cursor","Remove the drag cursor which is shown when panning a document by dragging with the cursor.","No Taskbar Item Glow","Disables the glow hover effect on Windows 7 and 8","Disable Windows Ink modifier tooltips","Stops DWM from rendering Windows Ink key modifier tooltips","Notepad Clientedge","Applies client edge to newer versions of Notepad","Dark Mode for Notepad","The missing dark mode theme for Notepad","Notepad Multi-Select","Adds Alt+Shift multi-caret, highlighting, auto-indent, auto-pair, and Ctrl+D duplication.","Notepad Remove Launch New App Banner","Removes the banner in classic notepad that tells you to launch the new app.","Notification Bell Highlighter","Pulsing, bright overlay with a counter on the taskbar notification bell","Notification Center Follows Taskbar","Keep Notification Center aligned with your taskbar, with optional placement swaps for notifications/calendar and media playback/Quick Settings.","Customize Windows notifications placement","Move notifications to another monitor or another corner of the screen","Numbered taskbar","Adds numbers (1-0) to taskbar icons corresponding to Win + Number shortcut","Num Lock Lockdown","Keeps Num Lock permanently ON, with a modifier key for temporary override","Numpad Disabler","Selectively disables Numpad key detection for a specific application. Prevents background tools or game trainers from intercepting Numpad inputs.","Hide NVIDIA Control Panel Missing Dialog","Hides the nvcontainer.exe popup that says NVIDIA Control Panel is not found","Office Fix Account Display Name","Fixes the inverted First/Last name and the hardcoded space in Office apps. Supports custom display name override.","Office UI Reverter","Reverts Office 2022+/365 UI to Office 2016/2019","Office UI Reverter (32/64-bit Universal)","Old Auto Colorization","Restores old auto colorization algorithms from before Windows 10 1809","Old Explorer System Menu Behavior","Restores Windows XP behavior to the window icon in File Explorer","Old Regedit Tree Icons","Makes the tree view in regedit use the icons from 2000/XP","Old This PC Commands","Makes \"Open Settings\", \"System properties\", etc. in This PC use Control Panel instead of Settings","OmniButton Customizer","Arrange the Windows 11 OmniButton's network, volume, battery and percentage into any layout you write, hide any of them, and recolor them independently","On-Screen Indicator Position","Put the volume, brightness and camera on-screen indicators anywhere on the screen, each in its own spot if you like, or hide specific indicators","One Hair","A hair on your screen. Always on top.","One Key Keyboard Layout Switcher","Switch keyboard layout with a single key press (Win, Alt, or Menu key)","OneNote Cursor Teleport Fix","Resolves the pen tablet cursor rubber-band bug by syncing the Win32 mouse with Windows Ink","Open in Admin Terminal","Adds Explorer classic context menu entries to open a terminal (elevated or not) in the current or selected folder, and to run script files.","osu!Profile in Taskbar","Displays PP, rank, and avatar from rhythm game osu! (standard mode) next to the system tray","Outlook Refined","Restyles new Outlook: favorites groups, per-account compose buttons, a resizable folder pane, an agenda with a month grid, the Other inbox under Focused, a tidier calendar and reading pane, and a print layout","OverhauldedWin Alt+Tab","Replaces the boring Windows Alt+Tab with a modern and elegant window switcher.","Parallax Wallpaper","Smooth mouse-reactive wallpaper with optional perspective, four motion presets, independent multi-monitor support, and HDR-aware rendering","\"Sign in with a passkey\" popup blocker","Blocks automatic Windows Security \"Sign in with a passkey\" popup in browser. Only allows them after a recent click/tap or Enter/Space.","Paste Clipboard Content to Explorer","Paste text and images from clipboard as files in Explorer and in file dialogs","Per-app Language Preferences","Override the preferred UI language for specific apps.","Per-App Titlebar Buttons","Hide selected native titlebar buttons for configured applications","Per-Application UI Language","Set the Windows UI language per application.","Per-monitor brightness and more in Quick Settings","Brightness, contrast, volume, input and power controls for every connected monitor, plus sliders for all of them at once, in the Windows 11 Quick Settings panel","Per-Monitor Scale Switcher","Per-monitor DPI scaling based on monitor friendly name.","Perform Speed Test Redirect","Redirects the \"Perform speed test\" link in the taskbar network right-click menu from the default Microsoft page to a custom URL (defaults to speedtest.net).","Performance Information and Tools Restorer","This mod restores the classic Windows Performance Information and Tools (Windows Experience Index) page for Windows 10 and 11","Windows Photos Fullscreen Mode","Forces Windows Photos app to open in fullscreen mode instead of windowed mode","Photoshop Dark Menus","Enables dark mode and custom colors for all menus in Adobe Photoshop.","Open pinned items with double click","Only open pinned items when double clicking on them to avoid accidental clicks","Pinned Only on Start Menu","Hides 'All apps' and 'Recommended' sections from the Start Menu.","PivotLink: Browser Router","Lightweight link redirection tool with an intuitive 5-tier ranked configuration layout.","Pointer Afterimage Motion Blur","A real motion blur for the mouse pointer, made of fading afterimages of your own cursor","Power Action Countdown","Shows a configurable cancellable countdown before shutdown, restart, sleep, or hibernation.","Power Options Button","Tray icon to switch between Windows power plans with the mouse wheel.","Premiere Pro Theme","Recolors the Adobe Premiere Pro interface — panels, timeline, monitors, window frame and menu bar — with a choice of very dark palettes.","Prevent Focus Stealing","Prevents specific apps from stealing focus when a window is opened.","Don't Pull Me to Another Desktop","Summon existing windows to the current virtual desktop instead of pulling you away.","Pre-Vista Explorer Status Bar","Classic status bar for Explorer with XP/2000/98/95 pane styles, zone display","Pre-Vista File Operation Dialogs","Replaces file transfer progress and confirmation dialogs with pre-Vista versions","Privacy Indicator Anchor","Permanently shows location/microphone/camera/Copilot icons in the system tray — dim when idle, bright when in use — preventing taskbar layout shifts.","Proportional cursor between monitors","Keeps the relative (0-1) cursor position when it moves between monitors of different resolutions, so the bottom of a small monitor matches the bottom of a big one","PaintShop Pro Dark Mode","Darker interface, black title bar, accent color and dark image windows for Corel PaintShop Pro","Quick Explorer Switcher","Shows the folders currently open in File Explorer (up to 3) as shortcuts in the Open/Save dialogs of any program","Quick Launch Dock","A slim animated dock on the screen edge: drop a shortcut or pick a program with \"+\", then launch it in one click","Quick Launch & Media Panel","A modern desktop panel with configurable app shortcuts, drag and drop, and Windows media controls.","Quick Settings Media Progress Bar","Adds a modern, interactive Fluent seek bar and live timestamps to the Windows 11 Quick Settings media player card.","Quick Share Flyout","Open Google Quick Share as a flyout above the system tray","Quick translator & Layout-switcher","Fast layout corrector, in-place translator, and floating HUD tooltip.","3D buttons on Quick Launch bar","Makes the buttons on the Quick Launch bar 3-dimensional","Radial Window Switcher","A macOS-style radial Alt+Tab: app icons in a ring, a live window preview and smooth animations","Real-time Cast Shadow Wallpaper","A light moves over your desktop and every open window casts a soft, real-time shadow on the wallpaper","Recycle Bin File Preview","Preview deleted files in the Recycle Bin using the native File Explorer Preview Pane (Alt+P), without restoring them.","Real Names in Pre-Vista Recycle Bin Prompts","Companion to Pre-Vista File Operation Dialogs: its XP-style prompts for deleting from the Recycle Bin show the file's real name instead of the internal $R name the Recycle Bin keeps it under","Recycle Bin Tray","Adds an interactive Recycle Bin icon to the Windows 11 system tray with live state updates, drag-and-drop support, theme-aware rendering, multiple icon styles, and configurable mouse actions.","Refined Quick Settings and Sound","A \"vanilla+\" rework of the Windows 11 Quick Settings and Volume mixer panels for daily use","RegEdit Auto Trim Whitespace on Navigation Bar","Automatically trims whitespace on the navigation bar","RegEdit Disable Beep","Prevents RegEdit from beeping when an invalid key is entered to the navigation bar","RegEdit Fix \"Copy Key Name\"","Makes the \"Copy Key Name\" context menu option actually copy the name of the key instead of the path.","Remap Copilot Key","Global low-level hook running inside Windhawk to remap or disable the Copilot key, featuring per-app rules.","reMarkable App Polish","Make the screen share window capturable, add option to lock its aspect ratio.","Remember the folder windows' positions","Remembers the folder windows positions the way it was pre-Vista (Win95-WinXP)","Remove Legacy Clock Square Cutout & Animated Custom Image","Removes the light square background behind the analog clock in StartAllBack and Date/Time dialogs, with full animated GIF and PNG replacement support.","Remove Command Bar","Removes the Command Bar from file explorer.","Remove Context Menu Items","Removes unwanted items from file context menus with configurable options and context-aware filtering","Remove \"Exit Fullscreen\" popup in Chrome","Removes “TO EXIT FULLSCREEN PRESS ESC/F11” popup in Chromium-based browsers like Chrome/Opera/OperaGX/Edge/Brave and more","Open With - Remove Microsoft Store Menu Item","Removes the \"Search with Microsoft Store\" menu item from the \"Open with\" submenu","CTRL+SHIFT+C quotes remover","Intercepts the copied file path (CTRL+SHIFT+C in Explorer) and removes surrounding quotes","Remove Shortcut Arrow Overlays","Removes shortcut arrow overlays from desktop and File Explorer icons cleanly in memory.","Remove Windows Spotlight Desktop Shortcut","Removes the new Desktop Shortcut when you enable Windows Spotlight.","Reopen Programs at Sign-in","Reopens the programs that were open before shutdown/restart the next time you sign in","Replace the buggy SDHC card drive icon","Replace the buggy SDHC card drive icon which MS does not bother to fix","Replace Shell Format Dialog","Replaces the Shell Disk Format Dialog with a custom app of your choosing.","Winver Redirector","Replaces Winver with an executable, command, or Shell app","Discord Transparency Resize Fix","Forces discord to be resizable with vencord window transparency","Resource-Aware Task Terminator","Terminate the active window process, a top resource offender, or a weighted resource-heavy app group with verified process identity and sortable usage metrics.","Restore AutoRun Icon in Drive Properties","Restores the missing AutoRun icon in drive properties","Restore Button Pulse Animation","Restores the pulse animation that focused buttons played in Windows Vista/7","Restore the classic Personalization and other CPLs","Brings back the classic Personalization applet and other CPLs.","Restore Explorer \"Exploring\" Mode","Reintroduces File Explorer's \"Exploring\" mode from Windows XP and before","ExplorerFrame and menubar fixes fork","Fixes explorer problems: menu bar, listview redraw, classic background color, Control Panel header/sidebar color for dark themes","Restore legacy network tray","Restores the classic network tray icon on Win10 taskbar running under Win11 24H2+","RetroBar Clock Flyout Fix","This mod fixes the Aero clock flyout opened by RetroBar by restoring the thick borders on it","UIRibbon Caption Icon Fix","Fixes the position of the caption icon in UIRibbon.","Round Everything","Turns the taskbar into a frame around a rounded screen, rounds the monitor corners, and gives every window - maximized included - one corner radius","Rounded Selection Rectangle","Rounded selection rectangles with a gentle fade-out","Disable IME in Run Dialog","Disable IME automatically when typing in the Run dialog, to prevent accidental input of non-English characters.","SafeDiscShim","Run SafeDisc protected games on Windows 10 and above.","Saved Run Commands","Adds a compact saved commands list to Run-style dialogs.","Screenshot Path to Clipboard","Monitors the Screenshots folder and copies the full path of each new .png screenshot to the clipboard the moment it appears.","Scroll Window Opacity","Hold a key combination and scroll the mouse wheel to change the opacity of the window under the cursor","Search on Active Display","Opens Win+S search on the monitor where the mouse cursor is located, or in a custom monitor of choice","Search Menu Inspect Helper","Helps inspect the search menu web view content via DevTools remote debugging, refer to the description for details","Secondary Monitor Pin","Keeps windows that are placed on secondary monitors pinned so they appear on all virtual desktops.","Secondary windows on the active monitor","Multi-monitor: secondary windows of the selected apps (Telegram media viewer, etc.) open on the monitor of the app's active window instead of the remembered one","Separate System Tray Icons","Replaces the grouped Windows 11 system tray button with separate sound, Bluetooth, network, Control Center, and battery buttons.","Redirect Settings to Control Panel","This mod forces the classic Control Panel to open instead of Windows 10/11 Settings app using native components","Shadowplay anti-disable","Prevent Nvidia ShadowPlay from disabling itself","ShadowPlay Save Folder Override","Forces Nvidia ShadowPlay to save all clips into a single folder","Shake to Find Cursor","Temporarily enlarges the mouse cursor when you shake the mouse, like macOS \"Shake to locate\"","Shell Animation Disabler","Selectively disable UWP shell animations while preserving other system animations.","Shell Flyout Positions","Customize the position of the Notification Center, Action Center, and Start menu on Windows 11","Shrink Address Bar Height","Shrinks the address bar height in file explorer","StartIsBack++ Tweaker","Modify StartIsBack++'s features (2.9.20)","Simple Window Switcher","Replaces the default Alt+Tab with a lightweight window switcher inspired by ExplorerPatcher's Simple Window Switcher","Siri Plus Launchpad","Replaces the Start menu with a macOS 27 Siri-style launcher: search bar with categories, app tabs, files, clipboard, actions and live glass","Slick Window Arrangement","Make window arrangement more slick and pleasant with a sliding animation and snapping","Small Tray Icons on Touch","Reduces the size of tray icons on touch screens","Smart Process Priority & RAM Optimizer","Boosts foreground responsiveness, shields audio, network, and AI workloads, throttles runaway background CPU, and safely reclaims idle memory.","Smooth Desktop Icons Auto-Hide","Smoothly auto-hide Windows desktop icons with click-to-show, double-click-to-hide, drag reveal and configurable fade animation.","Smooth Scroll for Win32","Adds smooth scrolling with spring physics to legacy Win32 apps","Smooth Virtual Desktop Switching","Smooth native touchpad and Ctrl+Win+Arrow virtual desktop transitions.","Snap Commander","Move the active window to screen halves and corners with keyboard shortcuts (inspired by Rectangle on macOS)","Snap Flyout Instant","Controls the delay before the snap layouts flyout appears and hides","Restore to Snap Position","When a snapped window is maximized and then restored, it returns to its snapped position instead of its pre-snap position","SnapSentry","Watch your Screenshots folder or any folder you pick, then copy, rename, or delete each new screenshot, or choose from a notification.","Snipping Tool Pen Text","Adds a text tool to the Windows 11 Snipping Tool that writes with the app's own pen","Split Tray","A notification area on every display's taskbar: choose, per application, which tray its icon shows in","Spoof Light/Dark Theme","Use light/dark theme on an application basis","Spoof MachineGuid","Replaces the MachineGuid returned by registry queries, for the target process only","Spotlight Launcher","Application launcher. Alt+Space opens a floating search bar that finds your programs instantly.","Explorer Standard Title Bar Colors","Forces Explorer to use the same titlebar colors as most apps.","Start Button Replacer","Replace the Windows 11 Start button icon with a custom PNG, JPG or GIF image","Everything & Power Tools in the Start Menu","Replace Windows 11 search with Everything-powered files, apps and settings in a separate search window.","Show all apps by default in start menu","When the Windows 11 start menu is opened, show all apps right away","Start Menu Category Manager","Adds a \"Manage Categories\" item to the Windows 11 Start menu's right-click menu, for customising app categories. Also hides empty category tiles from the Start menu (optional).","Start menu open location","When clicking the Start button, opens the Start Menu on the monitor where the mouse cursor is located, or in a custom monitor of choice","Start Menu Open Real File Location","Makes Open file location select a Start menu shortcut's target instead of the shortcut itself","Start Menu Size","Set a custom size for the Start menu and search menu on Windows 11","Start Search Bing Redirector","Redirects Bing web-result clicks in the Start menu search to Google (or another engine) and opens them in your default browser instead of Edge.","StartAllBack Jump List Width","Changes the width of StartAllBack jump lists and keeps their internal controls aligned.","StartPad","macOS-style fullscreen app launcher with pages, folders, and drag-and-drop organization","Startup App Delay Fix","Removes the delay Windows applies to startup applications after sign-in","Sticky Notes: Alt+Tab group","Group Microsoft Sticky Notes into one Alt+Tab entry, bring open notes forward together, and use compact previews.","SumatraPDF scroll tabs with mouse wheel","Use the mouse wheel while hovering over the tab bar to switch between tabs in SumatraPDF","Super Shortcuts for Mouse","Hold the right (or a side) mouse button and click or scroll to close, minimize, maximize the window under the cursor, skip tracks and more","Suppress Run Box Error Message","Prevents the error message from opening if invalid input is entered into the Run box","System Properties \"General\" Tab","Restores the \"General\" tab to the system properties dialog (sysdm.cpl).","Enable SyslistView32","Enables SysListView32 folder layout in Explorer","System Tray Folders","Group icons in the Windows 11 \"Show hidden icons\" tray flyout into folders","Task Manager Tail","Automatically keeps Task Manager (or other apps) at the end of the taskbar. (Windows 10 & 11)","Task View Customizer","Customize Windows 11 Task View with desktop-only layouts, background materials, theme colors, highlights, animations, hover switching and New desktop button controls","Taskbar AI Quota Bars","Shows configurable AI agent/LLM subscription quota bars for Anthropic, OpenAI, and Google Antigravity on the Windows 11 taskbar","Taskbar AI Usage","Shows your Claude, Codex, Antigravity and GitHub Copilot usage limits as ring tiles on the Windows 11 taskbar, with a Fluent flyout for the details","Taskbar App Memory","Apps you choose go back to their place on the taskbar when they reopen, instead of to the end","Taskbar audio device switcher","Shows a tray icon for every connected audio device and switches the default device with a click","Taskbar Audio Flipper","A taskbar widget that switches between your speakers, headsets and microphones with a click, and turns a webcam on and off","Taskbar auto-hide custom activation area","Customize the taskbar auto-hide activation area, allowing to limit mouse unhiding to specific regions","Taskbar auto-hide after a delay","Hides the auto-hide taskbar a configurable number of seconds after it becomes visible, unless the mouse pointer is over it","Taskbar auto-hide fine tuning","Fine-tune taskbar auto-hide: keyboard-only unhide, prevent the taskbar from showing at all, hotkeys and mouse events to show or toggle visibility","Taskbar auto-hide per monitor","By default, Windows uses the same auto-hide setting for all monitors. This mod allows setting different auto-hide settings for each monitor.","Taskbar auto-hide speed","Customize the taskbar auto-hide animation speed and frame rate to make it feel less sluggish and janky","Taskbar auto-hide when maximized","Makes the taskbar auto-hide only when a window is maximized or intersects the taskbar","Better Taskbar Autohide","Allow taskbar autohide when inactive window notified","Windows 11 Taskbar Auto-Hide in Context","Adds an option to toggle taskbar auto-hide to the native Windows 11 taskbar context menu.","Taskbar Auto-Hide Instant Show","Removes the delay before the taskbar appears with custom animation types (none, slide, elastic, bounce, fade, slide+fade, overshoot)","Taskbar Background Helper","Sets the taskbar background for the transparent parts, always or only when there's a maximized window, designed to be used with Windows 11 Taskbar Styler","Taskbar Blob Shape","Injects a customizable blob shape behind active taskbar items.","Taskbar brightness and opacity tuner","Adjust the opacity of the taskbar background and of the icons and text, and dim the taskbar background, for a clean, beautiful taskbar which is easier on the eyes and on OLED displays","Middle click to close on the taskbar","Close programs with a middle click on the taskbar instead of creating a new instance","Taskbar minimize/restore on scroll","Minimize/restore by scrolling the mouse wheel over taskbar buttons and thumbnail previews","Taskbar Calendar Week Numbers","Shows calendar week numbers (ISO 8601 or regional) in the Windows 11 taskbar calendar flyout","Taskbar Cat","An orange pixel-art cat that lives on your Windows 11 taskbar: it wanders, naps, grooms, purrs when you hover, hunts butterflies, plays with yarn and reacts to you.","Taskbar Start Button Centered Origin","Pins the Start button to true screen-center and splits running-app taskbar buttons into two groups flanking it by which side of the screen each window is on (Windows 11 only; incompatible with \"Start button always on the left\")","Taskbar classic context menu","Show the classic context menu when right-clicking on taskbar items","Taskbar Clock Customization","Custom date/time format, news feed, weather, performance metrics (upload/download speed, CPU, RAM, GPU, battery), media player info, custom fonts and colors, and more","Taskbar Clock Spacer","Companion for Taskbar Clock Customization: a %s% token for explicit, weightable elastic gaps between clock items (unlike its built-in Justified alignment, which stretches every space). Windows 11 only.","Taskbar Clock to Left","Move the native Windows 11 clock/notification button to the left without shifting centered taskbar apps","Taskbar collapse to running apps","Hides pinned taskbar icons whose app is not running. Hover, rest on, or click the empty taskbar to reveal.","Taskbar ContentPresenter Injector","Injects a ContentPresenter into Taskbar.TaskListLabeledButtonPanel and Taskbar.TaskListButtonPanel","Taskbar Count Badges","Show customizable per-taskbar-button window counts as badges or dots on Windows 11.","Taskbar Countdown Timer","A simple countdown timer integrated into the Windows 11 taskbar (Windows 11 only)","Taskbar Desktop Indicator","Displays the current virtual desktop as a number or marker in the Windows 11 taskbar clock area","Taskbar Disappearing Icon Fix for Windows 11","[Deprecated for Win11 24H2+] Tries to fix disappearing icon in Windows 11 taskbar while switching virtual desktops.","Disappearing Tray Icons Fix","Fixes missing system tray icons by broadcasting TaskbarCreated when the taskbar initializes.","Taskbar Disk Space Label","A simple disk space label integrated into the Windows taskbar","Taskbar Dock Animation","Animates taskbar icons on mouse hover like in macOS","Taskbar Dock Animation Plus","Animates taskbar icons on mouse hover like in macOS (updated fork with support for all taskbar positions and multi-monitor fixes)","Windows 11 Taskbar Drag and Lock","Drag the taskbar to any screen edge and lock it from the taskbar context menu","Taskbar Elastic WinUI Pill","Injects an animated sliding pill for active taskbar items.","Click on empty taskbar space","Trigger custom action when empty space on a taskbar is clicked. Various mouse clicks and keyboard modifiers are supported.","Taskbar Fade","Reduces visual clutter by automatically dimming or hiding the taskbar when idle. Ideal for focused workflows and preventing OLED burn-in.","Taskbar Fluent Media Player","Taskbar Fluent Media Player — is a Windhawk mod that integrates a modern media player with Fluent Design directly into the Windows 11 taskbar. It allows you to control music and view track information seamlessly without interrupting your workflow.","Taskbar Folder Menus","Adds compact Windows 11 taskbar buttons that open configured Shell targets as popup menus, similar to classic taskbar toolbars.","Disable grouping on the taskbar","Causes a separate button to be created on the taskbar for each new window","Hide running indicator for Windows 10","Hides taskbar running indicator for Windows 10","Taskbar Icon Animation","Heartbeat, flash, ripple, neon glow, sparkle, bounce, wobble, confetti and more animations when hovering taskbar icons","Taskbar hung windows rearrangement fix","Fixes a taskbar bug which causes taskbar items of hung windows to move to the end of the taskbar","Taskbar Icon Group Centering","Center the taskbar icons after a chosen position as one group relative to the whole taskbar. Requires the taskbar to be set to Left alignment.","Taskbar Icon Separators","Create tracked icon separators with configurable padding on the taskbar.","Taskbar height and icon size","Control the taskbar height and icon size, improve icon quality (Windows 11 only)","Independent taskbar per monitor","Each taskbar shows only the windows of its own monitor and has its own pinned items","Taskbar jump list on cursor pos","Open the taskbar jump list context menus near the mouse cursor, not in the middle of the taskbar group","Taskbar Jump List Volume Control","Adds a per-app volume slider to the taskbar jump list","Taskbar Labels for Windows 11","Customize text labels and combining for running programs on the taskbar (Windows 11 only)","Taskbar language indicator layout control","Prevents the Tray area from jumping around when the language indicator is hidden while RDP client window is active. There are multiple mitigations you can choose from.","Cycle through taskbar windows on click","Makes clicking on combined taskbar items cycle through windows instead of opening thumbnail previews","Taskbar Live HUD","Compact system monitoring widget for the taskbar: CPU, RAM, network speed, optional ping and a working set trimmer","Taskbar Margin","Adds a configurable margin to the taskbar content","Taskbar Media Widget","Compact media controls integrated into the Windows 10/11 taskbar.","Taskbar multi-tray","Windows 11 taskbar tray/control-center visibility controls for all or selected monitors","Multirow taskbar for Windows 11","Span taskbar items across multiple rows, just like it was possible before Windows 11","Taskbar Music Lounge","A native-style music ticker with media controls.","Taskbar: no minimize on click","Disable the minimize window function when clicking an already active window on the taskbar","Taskbar tray icon spacing and grid","Reduce or increase the spacing between tray icons on the taskbar, optionally have a grid of tray icons (Windows 11 only)","Always show all taskbar tray icons","Restore the missing Windows option to always show all tray icons, show new icons by default, or hide all of them (Windows 11 only)","Taskbar Numberer for Windows 11","Displays keyboard shortcut numbers (1-9, 0) on taskbar items like 7+ Taskbar Numberer","Taskbar on top for Windows 11","Moves the Windows 11 taskbar to the top of the screen","Taskbar Open Window Underline","Underlines the labels (and optionally the icons) of taskbar buttons whose windows are shown on the desktop, so open and minimized windows can be told apart at a glance","Per-monitor taskbar icon alignment","Choose icon alignment (Left, Center, Right) and Start button placement (Left, Right) independently for each monitor (Windows 11).","Primary taskbar on secondary monitor","Move the primary taskbar, including the tray icons, notifications, action center, etc. to another monitor","Left Taskbar Quick Pin Dock","A persistent icon dock anchored left of the Start button. Drag any app to pin it. Left-click to launch or focus. Double-right-click to unpin. Drag within the dock to reorder.","Taskbar RDP Launcher","A taskbar widget that starts Remote Desktop full screen on the number of displays you pick","Taskbar Recent Focus Highlight","Visually highlight the most recently focused running apps on the taskbar","Taskbar reorder within/between groups","Reorder taskbar items within and between groups by dragging with the right mouse button","Taskbar Restart Explorer","Adds a Restart Explorer shortcut to the native Windows 11 empty-taskbar context menu.","Taskbar Scroll Actions","Assign actions for scrolling over the taskbar, including virtual desktop switching, brightness control, and microphone volume control","Taskbar Separators","Add customizable visual separators between Windows 11 taskbar application buttons.","Taskbar Shadow & Border","Adds a customizable, floating shadow and border effect above the taskbar","Aero Peek on \"Show desktop\" button hover","Enable Aero Peek when hovering over the \"Show Desktop\" button, like it was possible before Windows 11","Taskbar Smoke","Soft, living smoke around the Windows 11 taskbar pills. Real fluid simulation: it rises, swirls, drifts over the edge and reacts to the mouse. Click-through overlay, follows auto-hide, hides in fullscreen.","Taskbar Snipper","Print Screen, or a button on the taskbar, selects part of the screen to mark up and copy or save; Win+Shift+R records it as a video to trim and copy or save","Taskbar Spatial Order","Keeps each app's windows on the taskbar in the order they sit on screen, left to right, in thumbnail previews and uncombined buttons","Taskbar Split: Running Left, Pinned Right","Places running apps on the left and closed pinned apps on the right, with flexible empty space between them (Windows 11).","Start button colorizer","Recolor the Start button icon on the taskbar with a color preset or with hue, saturation, brightness and opacity effects, and change its size (Windows 11 only)","Start Menu Corner Click Fix","Fixes the issue where clicking in the corner of the taskbar doesn't open the Start menu on multi monitor setups.","Start button always on the left","Forces the Start button to be on the left of the taskbar, even when taskbar icons are centered, with an option to also move the search and task view buttons (Windows 11 only)","Taskbar System Info","CPU, GPU, RAM and VRAM on the Windows 11 taskbar, with temperatures, history graphs, adaptive layouts and live dragging.","Taskbar System Utilities","Native XAML taskbar tools: Restart Explorer, Clean Temp, Reduce Memory, Reset GPU, Get IP, Rebuild Cache and Flush DNS.","Taskbar Thumbnail Hover Fix","Fixes hover state not updating when closing a thumbnail and another slides into position","Taskbar Thumbnail Reorder","Reorder taskbar thumbnails with the left mouse button","Taskbar Thumbnail Size","Customize the size of the new taskbar thumbnails in Windows 11","Taskbar Thumbnail Stats","Shows RAM, CPU and version of the program on the Windows 11 taskbar thumbnails","Disable Taskbar Thumbnails","Disable taskbar thumbnail and virtual desktop switcher hover flyouts, or replace thumbnails with a list","Taskbar Top Window Guard","Keeps windows out from under a top taskbar, with optional centering when windows open.","Taskbar tray auto-hide (show on hover)","Hide the taskbar tray area when not in use, and show it when hovering the mouse over it","Taskbar tray system icon tweaks","Allows hiding system icons: volume, network, battery, microphone, location/GPS, Studio Effects, Recall, language bar, bell (always or when there are no new notifications), and the \"Show desktop\" button (hide or set width)","Taskbar User Tile","Recreation of Early Windows 8 style User tile flyout","Taskbar Virtual Desktop Switcher","Injects clickable buttons into the taskbar — one per virtual desktop — with configurable grid arrangement for direct switching.","Vertical Taskbar for Windows 11","Finally, the missing vertical taskbar option for Windows 11! Move the taskbar to the left or right side of the screen.","Taskbar Volume Control","Control the system volume by scrolling over the taskbar or anywhere with modifier keys","Taskbar Volume Control Per-App","Control the per-app volume by scrolling over taskbar buttons","Taskbar Volume Percentage Indicator","Shows the master volume percentage in the Windows 11 system tray volume icon","Cycle taskbar buttons with mouse wheel","Use the mouse wheel and/or keyboard shortcuts to cycle between taskbar buttons","Taskbar Z-Order Override","Control whether the taskbar stays always on top, always at the bottom, or behaves like a normal window","Taskbar Zones","Organize Windows 11 taskbar apps into fixed left and right zones. Drag icons between sides and keep their positions when apps open or close.","Press Esc to exit Task Manager","Task Manager Show Link Speed","Replace DNS names in Task Manager with realtime link speeds because we care more about it.","Task Manager Network Speed in Bytes","Show network throughput in Task Manager as KB/s, MB/s, GB/s (bytes) instead of Kbps, Mbps, Gbps (bits)","Task Manager Tab Slide Animation","Smooth animated transition (crossfade or slide) when switching tabs (Processes, Performance, ...) in Task Manager.","Make Task Manager Tabs Taller","Windows 10 Task Manager tab labels are too small on high DPI screens, making them difficult to click, this mod makes them taller.","Teams Multi-Instance","Allows running multiple independent instances of the new Microsoft Teams desktop app","Text Replace","Replace any text with any other text in any program","Theme Toggler Tray","Add a system tray button to toggle between Light and Dark mode instantly.","Themed Regedit ListView","Makes the ListView in Regedit themed","ThinkPad Battery Controls","Charge to full temporarily and restore Lenovo battery protection.","Three Finger Drag","Move and snap any window by dragging three fingers on a precision touchpad, like on macOS","Tiling Helper","Tile windows on the current monitor with customizable layouts and hotkeys","Timer Resolution Control","Prevent programs from changing the Windows timer resolution and increasing power consumption","Titlebar For Everyone","Force native title bars and frames for various programs","Toast auto-dismiss","Closes toast notification banners after a configurable number of seconds, unless the mouse pointer is over them","Toggle Hidden Files","Toggle the visibility of hidden files in Windows Explorer using Ctrl+H","Top Taskbar Bleed","Bleeds the color of a maximized window's title bar into a top-docked taskbar behind the task buttons","TortoiseGit progress animation background fix for classic dark theme","Fixes progress animation background in classic dark theme by replacing white background with a classic button face colour","Touchpad Relaxed Hand Tracking","Enables 5-2 fingers mouse pointer tracking for improved hand ergonomics (admin windows need Windhawk 2)","Touhou Keyboard Binds","Allows you to change keyboard binds in Touhou","Tourne'Table [Audio Visualizer]","A real-time audio visualizer for the Windows desktop: every bar its own frequency band, a Direct3D 11 renderer that idles to nothing, live right-click settings, My Styles, a Media Card and shareable setups.","Translucent Flyouts Controller","Controls TranslucentFlyouts settings through Windhawk (registry bridge)","Translucent Windows","Enables native translucent effects in Windows 11","Transparent Desktop Icons with Spotlight","Make desktop icons transparent when idle with an interactive spotlight effect. Hover over the desktop or select icons to reveal them with full clarity and customizable transitions.","Transparent Screensaver Fix","Allows transparent screensavers to see your desktop again","Tray Agenda","Calendar agenda widget in the Windows 11 tray (Google Calendar accounts and ICS feeds) with native reminder notifications.","Tray hover expand","Open the hidden tray icons flyout on hover instead of clicking the chevron; optionally collapse it when the cursor leaves","Tray Overflow List","Hidden tray icons in a list with application names","Tray Utility Customizer","Granular per-icon control over the Windows tray utility icons — Show hidden icons, Emoji, touch keyboard, pen menu, virtual touchpad, and input/language indicator — arranged by one nestable layout expression.","Two-sided snapping in Win11","Disables Windows corner snap (quadrants) while keeping snap to the sides.","UIFILE Override","Override UIFILE resources","Fix Ribbon UI Insetting for Windows 10+","Fixes issues with inset elements in some applications, such as those using Ribbon UI.","Ultimate Custom Tray","This mod adds customizable system tray icons in Windows with configurable actions and context menus, support for image files and application icons, and automatic adaptation to the system theme.","Unlock Office Files for Upload","Transparently copies locked Office files (docx, xlsx, pptx, etc.) to a temp location when an upload or send is attempted while they're open in Word/Excel/PowerPoint. The OS deletes the copy automatically via FILE_FLAG_DELETE_ON_CLOSE.","Unlock Task Manager for Server","Re-enable features that are normally disabled in Task Manager on Windows Server","URL Blocker","Blocks selected applications from opening web URLs via ShellExecute. Useful for suppressing post-update pages, promo links, and similar browser popups","UWP Assets Redirect","Replace UWP app assets (such as icons) without worrying about updates or modifying system files permissions.","Clean up UWP processes","Automatically end UWP processes when no UWP apps are open.","UXTheme hook","Allows you to apply custom themes","Vector Screen Holder","Fills a display you choose with generative line art and keeps the PC from idling while it runs","Version Spoof","Fakes the Windows version reported to applications","Virtual Desktop Helper","Switch virtual desktops, move windows between desktops, and pin windows with customizable hotkeys","Virtual Desktop Hotkey Cycle","Makes Win+Ctrl+Left and Win+Ctrl+Right virtual desktop shortcuts loop through ends.","Disable Virtual Desktop Popups","Disables \"Desktop N\" popups on virtual desktop change.","Virtual Desktop Swipe Taskbar Fix","Restores taskbar presence in virtual desktop swipe previews.","Virtual Desktop Preserve Taskbar Order","The order on the taskbar isn't preserved between virtual desktop switches, this mod fixes it","Visio Thumbnail HD Fix","Fix low-resolution thumbnails for Visio documents in File Explorer","Visio: Middle Mouse Pan & Smart Zoom","Brings modern CAD-like navigation to Visio: Middle-drag to pan, scroll wheel to zoom.","Visual Studio Anti-Rich-Header","Prevent the Visual Studio linker from embedding the Rich header into new executables","VLC Discord Rich Presence","Shows your currently playing media on Discord — with cover art, quality tags, and a search button.","VMware Audio Distortion Fix","Fixes distorted audio in VMware virtual machines by setting high-resolution timers.","Disable VMware upgrade dialog","Disable the VMware Workstation \"old encryption algorithm\" upgrade dialog","Compact Voice Access bar","Turn the full-width Voice Access bar into a compact window and stop it from reserving space at the top of the screen","Volume control open location","Shows the volume control on the monitor where the mouse cursor is located, or on a custom monitor of choice","Volume HID Sendeer","HID Mod For Volume (Mountain Everest Max Only)","VS Code Dark Non-client Frame","Forces VS Code's non-client frame into dark mode to remove the light 2px bottom edge in Windows light mode.","VSCode Tweaker","Tweak Microsoft Visual Studio Code by injecting custom JavaScript and CSS code","Bring Back the Borders!","Restores borders, corners, shadows, and more!","What When Where Notes","Multi-row notes with a centered title and editable note lines.","Widget Board Size and Position","Set a custom size and position for the new Widget Board on Windows 11.","Windows 7/8.1 Alt+Tab Recreation","This mod recreates the Windows 7 and the Windows 8.1 Alt+Tab switchers on Windows 10 and 11 without modifying explorer.exe","Win+D per monitor(show desktop)","Press Win+D to only manage the windows on the monitor where the mouse is located.","Win Duo Bar","A compact ring widget for the Windows 11 taskbar clock: a battery gauge ring, a Wi-Fi symbol, the time and date, and a charging animation","Win+E Reuse File Explorer","Restore an existing File Explorer window with Win+E, or open one normally if none exists","Win-X Hot Corners","macOS-style hot corners & edges for Windows with full multi-monitor support — trigger actions instantly when your cursor hits any screen corner or edge","Windows XP Sorted Columns","Tints sorted listview columns like in XP","Windows 10 1507 Search Pane Recreation","This mod recreates the Windows 10 RTM (1507) Search on Windows 10 and Windows 11","Windows 10 1507 Start Menu Recreation","This mod recreates the Windows 10 RTM (1507) Start menu on Windows 10 and Windows 11","Windows 10 Colorization Tweaks","Tweak the colorization of windows in Windows 10","Windows 10 Taskbar Context Menu Fix for Win11 24H2+","Fixes context menu on Windows 10 taskbar running on Windows 11 24H2, 25H2 and later","Windows 10 taskbar on Windows 11","Enables Windows 10 taskbar on Windows 11 versions 21H2 to 23H2","Win10 taskbar on Win11 24H2 or later","Installs Windows 10 taskbar on Windows 11 version 24H2, 25H2, 26H2, Windows Server 2025 and Windows 11 IoT Enterprise LTSC 2024","Win10 Taskbar Per-App Volume Control","Adjust per-app volume by scrolling the mouse wheel over Win10 taskbar buttons","Win10 Taskbar Search State Refresh on Win11 24H2+","This mod makes the Windows 10 taskbar search box/icon running on Windows 11 24H2+ follow the Search setting immediately, retrying and verifying until it is applied","Windows 8/10 Style Volume & Brightness OSD","Replaces the Windows 11 volume/brightness OSD with the vertical Windows 10 flyout","Windows 11 Accent Window Border","Show the accent color on the border but not on the titlebar","Windows 11 Custom Title Bar Colours","Allows changing the colour of active/inactive title bars, as well as enabling/disabling Immersive Dark Mode.","Windows 11 HomeGroup Page Restorer","This mod restores the classic HomeGroup Control Panel page on Windows 11 (cosmetic only)","Windows 11 Old Task Manager","Always use the Windows 8/10 styled Task Manager on Windows 11","Windows 11 Start Menu Power Buttons","Adds customizable one-click Shut down, Restart, Sign out, Sleep, Hibernate, and Lock buttons to the Windows 11 Start menu, replacing the default power flyout.","Windows 11 Start Power Text Renamer","Rename the Windows 11 Start menu power options (Lock, Sleep, Shut down, Restart) to any custom text.","Taskbar Overflow on Hover","Opens the Windows 11 taskbar overflow menu on hover and closes it when you move away or click.","Windows 2000 End Program Dialog","Replaces the Windows 11 \"not responding\" dialog with the End Program dialog of Windows 2000, in English or Russian","Win32 Tray Clock Experience","Use the Win32 clock flyout instead of the XAML one","Win32 UI Modernizer","Modernizes legacy Win32 UI elements","Windows 7/8.1 Action Center Recreation","This mod recreates the Windows 7/8.1 Action Center tray/flyout and restores the classic Security and Maintenance CPL links","Windows 7/8.x Alt+Tab Loader","Loads Windows 7/8.x Alt+Tab on Windows 10.","Windows Vista/7 Blocked Shutdown UX & Logoff Sequence","Bring back Windows Vista/7's shutdown experience","Windows 7 Classic AutoPlay Dialog Restorer","This mod restores the classic Windows 7 AutoPlay dialog for removable drives and optical media","Windows 7 Command Bar","Restores the Windows 7 file command bar in the file explorer","Windows 7 Desktop Widgets","Authentic Windows 7 Clock & Calendar desktop widgets with 8 skins, options dialog, expandable notebook and multi-monitor support.","Classic Display Control Panel Restorer","This mod restores the classic Display and Screen Resolution Control Panel pages on Windows 10 and 11","Win7 Disable Composition for process","Disables desktop composition when a certain process is running","Windows 7 File Open/Save Toggle Bar Icon","Restores the bitmap arrow glyph on the \"Toggle Folders\" button in open/save dialogs.","Windows 7 Region and Language Restorer","This mod restores the classic Windows 7 Region and Language Control Panel pages on Windows 10 and 11","Windows 7/8.1 Language Switcher Restorer","This mod restores the classic Windows 7 and Windows 8.1 language switcher on Windows 10 and 11","Windows Vista/7 Legacy Applet Restorer","This mod restores a series of classic Control Panel applets on Windows 10 and Windows 11 including optional additions","Logon & Sleep Fade Restorer","Bring back the old logon screen and sleep fade effect","Windows Vista/7 Logoff Screen Restorer","This mod shows a Windows Vista/7-style full-screen confirmation listing your open programs before log off, shut down or restart on Windows 10 and 11","Windows 7 Network Flyout Recreation","This mod accurately recreates the Windows 7 network flyout for Windows 10 and 11 and it restores the Network Sharing Center Control Panel page","Windows 7 On Screen Keyboard Restorer","This mod redirects the Windows 10/11 On-Screen Keyboard (osk.exe) to the original Windows 7 one","Windows Vista/7 \"Open with\" Dialog Restorer","This mod restores the classic Windows Vista/7 \"Open with\" dialog on Windows 10 and 11","Windows 7/8.1 \"Please Wait\" Restorer","This mod replaces the theme-switch overlay with the classic \"Please wait\" box from Windows 7/8.1.","Windows 7 Style UAC Dim","Restores the desktop screenshot on the User Account Control screen","Windows 7 Style UAC Window Positioning","Make UAC windows show on top of parent window","Windows 7/8.1/10 UAC Recreation","This mod recreates the Windows 7, 8.1 and 10 UAC prompts on Windows 10/11 without changing UAC behavior or disabling the secure desktop","Windows 7 Window Animations Restorer","This mod restores the Windows 7 Aero minimize, restore and close animations on Windows 10 and Windows 11","Windows 8/8.1 Charms Bar Recreation","This mod recreates the Windows 8/8.1 Charms Bar on Windows 10 and Windows 11","Windows 8/8.1 Display Switch Recreation","This mod recreates the Windows 8/8.1 Display Switch (Second screen / Project) pane on Windows 10 and Windows 11","Windows 8/8.1 Family Safety Applet Restorer","This mod restores the legacy Family Safety Control Panel applet on Windows 10 and Windows 11","Windows 8 Network Flyout Restorer","This mod restores the Windows 8 Network Flyout on Windows 10 and Windows 11 (24H2+ included)","Windows 8/8.1 Search Charm Recreation","This mod recreates the Windows 8/8.1 Search Charm on Windows 10 and Windows 11","Windows 8.1 Start Screen Recreation","This mod recreates the Windows 8.1 Start Screen on Windows 10 and Windows 11","Windows 95/NT 4.0 Menubars","Restores the appearance of menubars from Windows 95/NT 4.0","Windows 95/98/NT 4.0 Open/Save Dialog","Modifies the classic open/save dialog to be more like Windows 98 and earlier","WinDbg No OleFlushClipboard","Prevents the UI from getting stuck on Ctrl-C","Mawaqit Prayer Clock","Mawaqit prayer clock with live countdown, multi-monitor taskbar support, prayer schedule popup, and customizable themes.","TopBar for Windows","A working TopBar with Flyouts for Windows through Windhawk.","Windhawk UI Translator","Translates mod names, summaries, READMEs, settings and changelogs in place inside the Windhawk UI.","Window Border Customizer","Replaces DWM stock borders with custom ARGB translucent borders.","Window Center & Resize","Center and resize the foreground window using global hotkeys. Cycle hotkey steps through custom sizes in order. Combine with center hotkey to resize+center in one press. Optionally auto-restores maximized windows before resizing.","Window Centralizer","Predictably centers new windows and dialogs to their parent, the screen or the mouse cursor, with configurable threshold and live exclusion list.","Where I Left It","Remembers each app's window position and size, restores it when the app opens again, and keeps open windows reachable when your display setup changes","Window Opacity","Set any window's transparency with global hotkeys: Modifier+1-9 for 10-90%, Modifier+0 resets, Modifier+Plus/Minus to cycle","Window Rules","Apply a rule to an app's windows: force position and size, move to a monitor, set opacity, keep on top. Matches executable, class and title.","Window Size Presets","Resize any window to a preset size from a hotkey or by hovering/right-clicking a title bar button (inspired by Sizer)","Window Wobble","KDE-style spring-physics window dragging, without injecting into dwm.exe","Windows 10 Action Center Restorer on Windows 11 24H2+","This mod restores the Windows 10 Action Center on Windows 11 with the fixed slide animation","Windows 10 Alt+Tab Restorer on Windows 11","This mod restores the native Windows 10 Alt+Tab switcher on Windows 11","Windows 10 language flyout guard and indicator colours","This mod hides the startup language flyout in the private Windows 10 shell on Windows 11 24H2+","Windows 10 legacy flyouts on Win11 24H2 restorer","This mod restores the Windows 10 network and battery flyouts in the private Windows 10 shell running on Windows 11 24H2+","Windows 10 Win+X restorer on Win11 24H2","This mod restores a Windows 10-style Win+X menu on Windows 11, with immersive or native Win32 styling and support for legacy and modern taskbars","Windows 11 Control Center Buttons","Replaces the gear button in the Windows 11 Control Center footer with fully customizable buttons.","Windows 11 File Explorer Styler","Customize the File Explorer with themes contributed by others or create your own","Windows 11 Native Four Column Snap Layout","Adds an extra native Windows 11 Snap Layout with four equal vertical columns","Windows 11 Notification Center Styler","Customize the Notification Center and Action Center with themes contributed by others or create your own","Windows 11 Settings Styler","Customize the Windows Settings app with themes contributed by others or create your own","Windows 11 Start Menu Buttons","Customizable buttons for the Windows 11 Start menu.","Windows 11 Start Menu Styler","Customize the Start menu with themes contributed by others or create your own","Windows 11 Taskbar Styler","Customize the taskbar with themes contributed by others or create your own","Windows 7 Clock Spacing","Makes the taskbar clock in Windows 10 use the spacing from Windows 7","Windows Animations","Smooth minimize, restore, close, switch animations for windows.","Windows Key to Search","Open Windows Search (Win+S) when either Windows key is tapped.","Windows Sandbox: close without confirmation","Stops the sandbox with \"wsb stop\" when its window is closed","Windows Terminal Start Minimized","When Windows Terminal opens at sign-in, it starts minimized or straight in the notification area. Requires Terminal's \"Launch on machine startup\" option","Windows Update Control Panel Page Restorer","This mod restores the Windows Update Control Panel page in Windows 10 and Windows 11","WinDraw - Screen Inking & Annotation","All-in-one hardware-accelerated screen drawing, shapes, radial quick menu, floating toolbar, and screenshot tool for Windows.","WinDuo","Lean the screen back as the laptop lid closes, using the webcam instead of a hinge sensor","WinKlok","A calmer, smarter clock mod for the Windows 11 taskbar. Packed with essential time utilities and a powerful notes panel that seamlessly supports rich text and LaTeX.","WinRAR Tweaks","Closes WinRAR on Esc (dialog-aware) and converts Size and Packed columns into readable units (B, KB, MB, GB, TB).","Winstant","Any window, instantly – right where you need it. Switch, arrange and launch from the minimize button or a hotkey","WinTips OSD","Shows a Win11-style floating OSD for Caps/Num/Scroll Lock, Insert and copy/paste/cut","WinUI Context Menu Animation","Adds smooth WinUI-style vertical slide animations to classic Win32 context menus in Windows 11","Win+V Panel Tweaks","Resize the Win+V clipboard / Win+. emoji panel and hide the tabs you don't use (Emoji, GIF, Kaomoji, Symbols, Most recently used)","Winver Custom Text","Allows you to set the text displayed in winver.exe.","Winver Text Customizer","Customize the text sent to ShellAbout by winver.exe","Withered Foxy Jumpscare","Randomly shows the FNAF 2 Withered Foxy jumpscare fullscreen on top of all apps. Downloads its default image and sound on first run","Wobbly Windows","The classic Compiz/KDE Plasma style Wobbly Windows effect for Windows 11!","Word Image Resize Anti-Flip","Prevents unintended flipping when dragging handles to resize images in Word.","Word Local AutoSave","Enables AutoSave functionality for local documents in Microsoft Word via direct Word saves","Word MathType Dark Mode Fix","Fix the readability issue of MathType Equations in Word dark mode.","Word OfficeMath EditBox Shade Fix","Fix the shade color issue of OfficeMath equation edit boxes in Word dark mode.","Word PDF Lossless Export","Forces Word to export PDFs with lossless image quality","SameFolderOnly","Stop File Explorer from opening duplicate windows. If a folder is already open, reuse that window instead. \"Show in folder\" also selects the requested file.","XP Time/Date CPL Fix","Fixes the Windows XP Time/Date CPL's clock display on modern systems","Control Discord's Registered Games","This mod allows you to control what games Discord can see and are collected for its Registered Games.","No MS Edge WebView2 for Copilot","Disables MSEdgeWebView2 child process creation for certain application, which is used for Copilot functionality.","ZenDesktop: Desktop Icon Toggle and Auto-Hide","Native C++ Windhawk mod to hide/show desktop icons by double-clicking, with optional inactivity-based auto-hide and restore."];

  var CACHE_KEY = 'windhawk-zh-cn-cache-v1';
  var MAX_TEXT = 4000;
  var CHUNK = 480;
  var CONCURRENCY = 2;
  var REQ_GAP_MS = 300;      // 两次请求起跑的最小间隔：整页几十条一口气打出去必被 429
  var TIMEOUT = 12000;
  var RETRY_AFTER = 60 * 1000;
  var lastHttpStatus = 0;
  var googleCoolUntil = 0;
  var gTCoolUntil = 0;
  var CH_COOL_MS = 90 * 1000;

  var CURATED = {
  "Desktop": "桌面",
  "This PC": "此电脑",
  "Textual mode": "文本模式",
  "Hide duplicates": "隐藏重复项",
  "Start expanded": "默认展开",
  "Make expandable": "允许展开",
  "Add to top": "添加到顶部",
  "Add This PC and Desktop to Nav Top": "将此电脑和桌面添加到导航顶部",
  "Center New Windows": "新窗口居中打开",
  "Desktop Marquee Fade": "桌面框选淡出动画",
  "Disk Usage Bar Customizer": "磁盘用量条自定义",
  "Explorer Column View": "资源管理器分栏视图",
  "Lid Close Sleep Delay": "合盖睡眠延迟",
  "Live Video Wallpaper": "视频壁纸",
  "Lock Keys Notifier": "锁定按键提示",
  "Dynamic Taskbar Transparency": "动态任务栏透明",
  "Taskbar Clock Customization": "任务栏时钟自定义",
  "Taskbar Labels for Windows 11": "Windows 11 任务栏标签",
  "Windows 11 Start Menu Styler": "Windows 11 开始菜单美化",
  "Windows 11 Taskbar Styler": "Windows 11 任务栏美化",
  "Windows 11 File Explorer Styler": "Windows 11 资源管理器美化",
  "Translucent Windows": "半透明窗口",
  "Taskbar on top for Windows 11": "Windows 11 任务栏置顶",
  "Vertical Taskbar for Windows 11": "Windows 11 竖向任务栏",
  "Taskbar Volume Control": "任务栏音量控制",
  "Middle click to close on the taskbar": "中键关闭任务栏程序",
  "Disable grouping on the taskbar": "关闭任务栏窗口分组"
};
for (var ck in CURATED) { if (!PAIRS[ck]) PAIRS[ck] = CURATED[ck]; }

function cleanMT(s) {
  if (!s) return s;
  return String(s).replace(/^[\s\-–—·•:：,，.。!！]+/, '').replace(/\s+/g, ' ').trim();
}

var knownSet = Object.create(null);
  for (var i = 0; i < KNOWN.length; i++) knownSet[KNOWN[i]] = true;

  var cache = (function () {
    try {
      var raw = localStorage.getItem(CACHE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  })();

  function saveCache() {
    try {
      var keys = Object.keys(cache);
      if (keys.length > 4000) {
        for (var j = 0; j < keys.length - 4000; j++) delete cache[keys[j]];
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
      zhIndexDirty = true;
    } catch (e) { /* 配额满就算了，下次再翻 */ }
  }

  // ---- 离线翻译包（预抓取译文，落本地，断网也能用）----
  var OFFLINE_KEY = 'windhawk-zh-cn-offline-v1';
  var OFFLINE_META_KEY = 'windhawk-zh-cn-offline-meta-v1';
  var CATALOG_BASE = 'https://mods.windhawk.net/catalogs/';

  var offline = (function () {
    try {
      var raw = localStorage.getItem(OFFLINE_KEY);
      var o = raw ? JSON.parse(raw) : null;
      return (o && typeof o === 'object') ? o : {};
    } catch (e) { return {}; }
  })();

  var offlineMeta = (function () {
    try {
      var raw = localStorage.getItem(OFFLINE_META_KEY);
      var o = raw ? JSON.parse(raw) : null;
      return (o && typeof o === 'object') ? o : null;
    } catch (e) { return null; }
  })();

  var packRunning = false;
  var packStop = false;
  var packText = '';

  function offlineCount() { return Object.keys(offline).length; }

  function saveOffline() {
    try {
      localStorage.setItem(OFFLINE_KEY, JSON.stringify(offline));
      offlineMeta = offlineMeta || {};
      offlineMeta.entries = offlineCount();
      zhIndexDirty = true;
      localStorage.setItem(OFFLINE_META_KEY, JSON.stringify(offlineMeta));
    } catch (e) { /* 配额满就只在内存里生效 */ }
  }

  function hasCJK(s) { return /[\u4e00-\u9fff]/.test(String(s || '')); }

  function fmtDay(ts) {
    var d = new Date(ts);
    if (isNaN(d.getTime())) return '';
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  function offlineStatusText() {
    var n = offlineCount();
    if (packRunning) return packText || ('正在下载… 已离线 ' + n + ' 条');
    if (!n) return '未下载。断网时只能翻界面文案，Mod 名称与简介仍是英文。点右侧按钮一次性抓取。';
    var s = '已离线可用 ' + n + ' 条译文';
    if (offlineMeta && offlineMeta.mods) s += '（官方目录 ' + offlineMeta.mods + ' 个 Mod）';
    if (offlineMeta && offlineMeta.at) s += ' · 更新于 ' + fmtDay(offlineMeta.at);
    return s + '。新上架的 Mod 再点一次可补全。';
  }

  function offlineBtnText() {
    if (packRunning) return '停止';
    return offlineCount() ? '更新离线包' : '下载离线包';
  }

  function fetchJsonOnce(url) {
    var opts = { credentials: 'omit', cache: 'no-store' };
    var ctrl = null, timer = 0;
    if (typeof AbortController === 'function') {
      ctrl = new AbortController();
      opts.signal = ctrl.signal;
      timer = setTimeout(function () { ctrl.abort(); }, 20000);
    }
    return fetch(url, opts).then(function (res) {
      if (timer) clearTimeout(timer);
      if (!res || !res.ok) throw new Error('HTTP ' + (res ? res.status : '?'));
      return res.json();
    }, function (err) {
      if (timer) clearTimeout(timer);
      throw err;
    });
  }

  // 官方目录抓取：失败自动重试三次（每次间隔递增），并把浏览器的 TypeError 换成能看懂的说法
  function fetchJson(url) {
    var tries = 0;
    function attempt() {
      tries++;
      return fetchJsonOnce(url).then(null, function (err) {
        var raw = (err && err.message) ? err.message : '';
        if (tries < 3) return sleepMs(1500 * tries).then(attempt);
        if (/HTTP \d+/.test(raw)) throw new Error(raw.replace('HTTP', '服务器返回'));
        if (err && err.name === 'AbortError') throw new Error('请求超时（20 秒没有响应）');
        throw new Error('网络请求被拦截或网络不通');
      });
    }
    return attempt();
  }

  function collectPackWork(enData, zhData) {
    var mods = (enData && enData.mods) || {};
    var zhMods = (zhData && zhData.mods) || {};
    var ids = Object.keys(mods);
    var nameTodo = [];
    var descTodo = [];
    var seen = Object.create(null);
    ids.forEach(function (id) {
      var em = (mods[id] && mods[id].metadata) || {};
      var zm = (zhMods[id] && zhMods[id].metadata) || {};
      var rows = [[em.name, zm.name, nameTodo], [em.description, zm.description, descTodo]];
      for (var r = 0; r < rows.length; r++) {
        var txt = rows[r][0];
        if (typeof txt !== 'string') continue;
        txt = txt.replace(/\s+/g, ' ').trim();
        if (!txt || seen[txt]) continue;
        seen[txt] = 1;
        if (hasCJK(txt)) continue;
        if (offline[txt] || PAIRS[txt] || cache[txt]) continue;
        var zt = rows[r][1];
        if (typeof zt === 'string' && hasCJK(zt)) {
          offline[txt] = cleanMT(zt);
          continue;
        }
        if (!/[A-Za-z]/.test(txt)) continue;
        if (/https?:|www\./i.test(txt)) continue;
        if (txt.length > 600) continue;
        rows[r][2].push(txt);
      }
    });
    return { ids: ids, todo: nameTodo.concat(descTodo) };
  }

  function sleepMs(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function runPack(todo, report) {
    var total = todo.length;
    var done = 0;
    var idx = 0;
    var fails = 0;
    var pauses = 0;
    var stopped = false;
    var reason = '';

    function step() {
      if (packStop) { stopped = true; reason = reason || '已停止'; return Promise.resolve(); }
      if (idx >= total) return Promise.resolve();
      if (fails >= 8) { stopped = true; reason = '翻译接口连续失败'; return Promise.resolve(); }
      if (googleChannelsCooled() && pauses >= 1) {
        stopped = true; reason = '所有翻译通道都被限流（Google 两个通道冷却中，MyMemory 也在限流）';
        return Promise.resolve();
      }
      var text = todo[idx++];
      return translateRemote(text).then(function (zh) {
        if (zh) {
          offline[text] = cleanMT(zh);
          done++;
          fails = 0;
          if (done % 25 === 0) saveOffline();
          report('正在预翻译… ' + done + ' / ' + total + '（已离线 ' + offlineCount() + ' 条）');
          return sleepMs(120).then(step);
        }
        fails++;
        if (lastHttpStatus === 429) {
          lastHttpStatus = 0;
          pauses++;
          if (pauses > 3) { stopped = true; reason = '翻译接口被限流'; return Promise.resolve(); }
          report('翻译接口限流，等 30 秒再试…（' + done + ' / ' + total + '）');
          return sleepMs(30000).then(step);
        }
        return step();
      });
    }

    var ws = [];
    var workers = Math.min(6, Math.max(1, parseInt(SET.packWorkers, 10) || 3));
    report('正在预翻译… 0 / ' + total + '（并发 ' + workers + '）');
    for (var w = 0; w < workers; w++) ws.push(step());
    return Promise.all(ws).then(function () {
      saveOffline();
      return { stopped: stopped, reason: reason };
    });
  }

  function downloadPack(onProgress, onDone) {
    if (packRunning) return;
    packRunning = true;
    packStop = false;
    var report = function (msg) { packText = msg; if (onProgress) onProgress(msg); };
    var done = function (msg) {
      packRunning = false;
      offlineMeta = offlineMeta || {};
      offlineMeta.at = Date.now();
      saveOffline();
      if (onDone) onDone(msg);
    };
    report('正在下载官方目录…');
    Promise.all([
      fetchJson(CATALOG_BASE + 'en.json'),
      fetchJson(CATALOG_BASE + 'zh-CN.json').then(null, function () { return null; })
    ]).then(function (res) {
      var work = collectPackWork(res[0], res[1]);
      offlineMeta = offlineMeta || {};
      offlineMeta.mods = work.ids.length;
      saveOffline();
      if (packStop) return done('已停止。离线可用 ' + offlineCount() + ' 条译文。');
      if (!work.todo.length) {
        return done('离线包已就绪：' + offlineCount() + ' 条译文，覆盖官方目录 ' + work.ids.length + ' 个 Mod。');
      }
      report('正在预翻译… 0 / ' + work.todo.length);
      return runPack(work.todo, report).then(function (r) {
        var head = r && r.stopped ? ((r.reason || '已停止') + '，') : '下载完成，';
        done(head + '离线可用 ' + offlineCount() + ' 条译文，覆盖 ' + work.ids.length + ' 个 Mod。可再点一次补全。');
      });
    }).catch(function (err) {
      done('下载失败：' + ((err && err.message) ? err.message : '网络不通') +
        '。已离线 ' + offlineCount() + ' 条仍可用。');
    });
  }

  // ---- 中文搜索：宿主自己的搜索框只认英文，这里给它补一层中文匹配 ----
  var zhIndex = Object.create(null);
  var zhIndexDirty = true;

  function normZh(s) { return String(s || '').replace(/[\s\u3000]+/g, ''); }

  function rebuildZhIndex() {
    zhIndex = Object.create(null);
    function add(en, zh) {
      if (typeof en !== 'string' || typeof zh !== 'string') return;
      if (!hasCJK(zh)) return;
      var k = en.trim().toLowerCase();
      if (!k || zhIndex[k]) return;
      zhIndex[k] = normZh(zh);
    }
    for (var k1 in PAIRS) add(k1, PAIRS[k1]);
    for (var k2 in offline) add(k2, offline[k2]);
    for (var k3 in cache) add(k3, cache[k3]);
    zhIndexDirty = false;
  }

  function zhHit(sourceLower, needle) {
    if (zhIndexDirty) rebuildZhIndex();
    var zh = zhIndex[sourceLower];
    if (!zh) return false;
    return zh.indexOf(normZh(needle)) !== -1;
  }

  function patchIncludes() {
    if (String.prototype.__whZhIncludes) return false;
    var orig = String.prototype.includes;
    String.prototype.includes = function (needle, pos) {
      if (orig.call(this, needle, pos)) return true;
      if (typeof needle !== 'string' || !hasCJK(needle)) return false;
      if (this.length > 2000) return false;
      try { return zhHit(String(this).toLowerCase(), needle); } catch (e) { return false; }
    };
    String.prototype.__whZhIncludes = 1;
    return true;
  }

  patchIncludes();

  // 只是英文（允许常见标点），中文/日文之类的直接放过。
  var LATIN = /^[\x20-\x7E\u2013\u2014\u2018\u2019\u201C\u201D]+$/;

  var queue = [];
  var active = 0;
  var cooling = Object.create(null);
  var lastReqAt = 0;         // 上一次真正发请求的时刻
  var throttleUntil = 0;     // 撞到 429 后整条队列暂停到这个时刻
  var rateHits = 0;          // 连续 429 次数，越大暂停越久；成功一次就清零
  var pumpBusy = false;

  // 界面固定文案（表头、筛选项这类一两个词的串过不了机翻门控，单独给一张小表）
  var UI = {
    'Name': '名称',
    'Description': '描述',
    'Author': '作者',
    'Version': '版本',
    'Status': '状态',
    'Installed': '已安装',
    'Not installed': '未安装',
    'Enabled': '已启用',
    'Disabled': '已禁用',
    'Category': '分类',
    'Rating': '评分',
    'Users': '用户数',
    'Downloads': '下载量',
    'Updated': '更新时间',
    'Created': '创建时间',
    'Details': '详情',
    'Remove': '移除',
    'Enable': '启用',
    'Disable': '禁用',
    'Clone': '克隆',
    'Settings': '设置',
    'About': '关于',
    'Home': '主页',
    'Search': '搜索',
    'Source code': '源代码',
    'Changelog': '更新日志',
    'Advanced settings': '高级设置',
    'All processes': '全部进程',
    'Filter': '筛选',
    'Filters': '筛选',
    'Show more': '显示更多',
    'Load more': '显示更多',
    'Apply': '应用',
    'Save': '保存',
    'Cancel': '取消'
  };

  function translate(text) {
    if (PAIRS[text]) return PAIRS[text];
    if (text.length <= 24 && UI[text]) return UI[text];
    if (cache[text]) return cache[text];
    if (offline[text]) return offline[text];
    var until = cooling[text];
    if (until && until > Date.now()) return null;
    if (text.length > MAX_TEXT) return null;
    if (!SET.longText && text.length > 160) return null;
    if (!knownSet[text] && !looksEnglish(text)) return null;
    enqueue(text);
    return null;
  }


  function looksEnglish(text) {
    if (!LATIN.test(text)) return false;
    if (/^[a-z0-9][a-z0-9._-]*$/.test(text)) return false;
    if (/https?:|www\.|\\|[{}<>$]|::/i.test(text)) return false;
    var words = text.split(/\s+/);
    if (words.length < 2) return false;
    if (words.length === 2 && (!SET.shortLabels || !/^[a-z]/.test(words[1]))) return false;
    var letters = 0;
    for (var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i);
      if ((c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 32) letters++;
    }
    if (letters / text.length < 0.6) return false;
    return true;
  }

  function enqueue(text) {
    if (inFlight[text]) return;
    if (queue.indexOf(text) !== -1) return;
    if (queue.length + active > 240) return;
    queue.push(text);
    pump();
    syncTip();
  }

  var tries = Object.create(null);
  var inFlight = Object.create(null);
  var diag = { ok: 0, fail: 0, err: '' };

  function noteFail() {
    diag.fail++;
    if (gTCoolUntil > Date.now() || googleCoolUntil > Date.now()) {
      var left = Math.ceil((Math.max(gTCoolUntil, googleCoolUntil) - Date.now()) / 1000);
      diag.err = '接口限流，' + left + ' 秒后自动重试';
    } else if (lastHttpStatus) {
      diag.err = 'HTTP ' + lastHttpStatus;
    } else {
      diag.err = '网络不通或超时（可检查代理）';
    }
  }

  function diagText() {
    if (!diag.ok && !diag.fail) return '还没发过翻译请求';
    var t = '成功 ' + diag.ok + ' 条 / 失败 ' + diag.fail + ' 次';
    if (diag.fail && diag.err) t += '（最近一次：' + diag.err + '）';
    return t;
  }

  function pump() {
    while (active < CONCURRENCY && queue.length) runOne(queue.shift());
  }

  // 待翻译的文本必须走参数：以前用函数作用域里的 var，两个 worker 共用一个变量，
  // 慢回来的那条会把译文写进另一条文本的缓存键，页面上就出现永远不翻的段落。
  function runOne(text) {
    if (!text) return;
    inFlight[text] = true;
    active++;
    translateRemote(text).then(function (zh) {
      zh = zh ? cleanMT(zh) : null;
      if (zh) {
        diag.ok++;
        rateHits = 0;
        throttleUntil = 0;
        cache[text] = zh;
        delete tries[text];
        delete cooling[text];
        saveCache();
        schedule();
      } else {
        retryLater(text);
      }
    }, function () {
      retryLater(text);
    }).then(finish, finish);
    function finish() {
      delete inFlight[text];
      active--;
      pump();
      syncTip();
    }
  }

  // 失败不再一口气冷却十分钟：按次退避重试，并把等待对齐到通道冷却结束，
  // 429 过去之后这批段落会自己变中文，不用用户手动刷新。
  function retryLater(text) {
    var n = (tries[text] || 0) + 1;
    tries[text] = n;
    if (n > 9) {
      noteFail();
      cooling[text] = Date.now() + 300000;
      setTimeout(schedule, 300500);
      syncTip();
      return;
    }
    if (n > 4) {
      noteFail();
      var coolMs = Math.min(300000, RETRY_AFTER * (n - 4));
      cooling[text] = Date.now() + coolMs;
      setTimeout(schedule, coolMs + 500);
      syncTip();
      return;
    }
    var wait = 1200 * n;
    var cool = Math.max(gTCoolUntil, googleCoolUntil);
    if (cool > Date.now()) wait = Math.max(wait, cool - Date.now() + 1000);
    wait = Math.min(wait, 95 * 1000);
    setTimeout(function () {
      if (queue.indexOf(text) === -1) queue.push(text);
      pump();
      syncTip();
      schedule();
    }, wait);
  }

  function splitForLength(text, limit) {
    if (text.length <= limit) return [text];
    var chunks = [];
    var rest = text;
    while (rest.length > limit) {
      var win = rest.slice(0, limit);
      var cut = Math.max(
        win.lastIndexOf('. '), win.lastIndexOf('! '), win.lastIndexOf('? '), win.lastIndexOf('; ')
      );
      if (cut > 0) cut = cut + 1;
      else cut = win.lastIndexOf(' ');
      if (cut <= 0) cut = limit;
      chunks.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    if (rest) chunks.push(rest);
    return chunks;
  }

  // 统一的起跑闸门：最小间隔 REQ_GAP_MS，撞到 429 后整条链一起暂停到 throttleUntil。
  function requestSlot() {
    return new Promise(function (resolve) {
      (function go() {
        var now = Date.now();
        var wait = Math.max(throttleUntil - now, lastReqAt + REQ_GAP_MS - now);
        if (wait > 0) { setTimeout(go, Math.min(wait, 20000)); return; }
        lastReqAt = Date.now();
        resolve();
      })();
    });
  }

  function withTimeout(url, tag, opts) {
    var init0 = opts || {};
    return requestSlot().then(function () {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, TIMEOUT);
    var init = init0;
    init.signal = controller.signal;
    return fetch(url, init).then(function (res) {
      clearTimeout(timer);
      lastHttpStatus = res.status || 0;
      if (lastHttpStatus === 429 || lastHttpStatus === 403) {
        if (tag === 'gt') gTCoolUntil = Date.now() + CH_COOL_MS;
        else if (tag === 'g') googleCoolUntil = Date.now() + CH_COOL_MS;
        rateHits++;
        throttleUntil = Date.now() + (rateHits === 1 ? 2000 : Math.min(60000, 4000 * rateHits));
      } else if (res.ok) {
        rateHits = 0;
      }
      return res.ok ? res.json() : null;
    }, function (err) {
      clearTimeout(timer);
      throw err;
    });
    });
  }

  function myMemory(chunk) {
    var url = 'https://api.mymemory.translated.net/get?q=' +
      encodeURIComponent(chunk) + '&langpair=' + encodeURIComponent('en|zh-CN') +
      '&de=' + encodeURIComponent('windhawk-zh-cn@example.com');
    return withTimeout(url).then(function (json) {
      var t = json && json.responseData && json.responseData.translatedText;
      if (typeof t !== 'string') return null;
      if (/LIMIT|INVALID|MYMEMORY WARNING/i.test(t)) return null;
      return t.trim() || null;
    }, function () { return null; });
  }

  function googleT(chunk) {
    if (Date.now() < gTCoolUntil) return Promise.resolve(null);
    var url = 'https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=auto&tl=zh-CN&q=' +
      encodeURIComponent(chunk);
    return withTimeout(url, 'gt').then(function (json) {
      if (!json) return null;
      var v = null;
      if (typeof json === 'string') v = json;
      else if (typeof json[0] === 'string') v = json[0];
      else if (json[0] && typeof json[0][0] === 'string') v = json[0][0];
      return (v && v.replace(/\s+/g, ' ').trim()) || null;
    }, function () { return null; });
  }

  function google(chunk) {
    if (Date.now() < googleCoolUntil) return Promise.resolve(null);
    var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=zh-CN&q=' +
      encodeURIComponent(chunk);
    return withTimeout(url, 'g').then(function (json) {
      if (!json || !json[0]) return null;
      var out = '';
      for (var i = 0; i < json[0].length; i++) {
        if (json[0][i] && json[0][i][0]) out += json[0][i][0];
      }
      return out.trim() || null;
    }, function () { return null; });
  }

  function translateOne(chunk) {
    if (SET.engine === 'mymemory') return myMemory(chunk);
    if (SET.engine === 'google') {
      return googleT(chunk).then(function (r) { return r ? r : google(chunk); });
    }
    // 自动：clients5 → 旧 Google → MyMemory。
    return googleT(chunk).then(function (r) {
      return r ? r : google(chunk);
    }).then(function (r) {
      return r ? r : myMemory(chunk);
    });
  }

  // 两个 Google 通道都在冷却期，就只剩 MyMemory
  function googleChannelsCooled() {
    var now = Date.now();
    return now < gTCoolUntil && now < googleCoolUntil;
  }

  function translateRemote(text) {
    var chunks = splitForLength(text, CHUNK);
    var parts = [];
    var chain = Promise.resolve();
    chunks.forEach(function (chunk) {
      chain = chain.then(function () {
        return translateOne(chunk).then(function (r) {
          if (!r) throw new Error('no translation');
          parts.push(r);
        });
      });
    });
    return chain.then(function () {
      return parts.join(' ');
    }, function () {
      return null;
    });
  }

  var SKIP_TAGS = {
    SCRIPT: 1, STYLE: 1, CODE: 1, PRE: 1, TEXTAREA: 1, INPUT: 1,
    OPTION: 1, SELECT: 1, SVG: 1, TITLE: 1
  };
  var SKIP_CLASS = /monaco-editor|monaco-diff-editor|ace_editor|vscode-editor|inputarea|whzh-bi|ModDetailsSource|SyntaxHighlighter|DiffWrapper|language-cpp|language-c/;

  function blocked(node) {
    var el = node.parentNode;
    while (el && el.nodeType === 1) {
      if (SKIP_TAGS[el.tagName]) return true;
      var cls = el.className;
      if (cls && SKIP_CLASS.test(String(cls))) return true;
      el = el.parentNode;
    }
    return false;
  }

  var OPEN_Q = '（';
  var CLOSE_Q = '）';

  function canBlockify(node) {
    var p = node.parentNode;
    while (p && p.nodeType === 1) {
      var tag = p.tagName;
      if (tag === 'BUTTON' || tag === 'A' || tag === 'LABEL' || tag === 'SUMMARY') return false;
      if (p.getAttribute && p.getAttribute('role') === 'tab') return false;
      p = p.parentNode;
    }
    return true;
  }

  function dropWrap(node) {
    var w = node.__whZhWrap;
    if (w) {
      if (w.parentNode) w.parentNode.removeChild(w);
      node.__whZhWrap = null;
    }
  }

  function paintNode(node) {
    var orig = node.__whZhOrig;
    var zh = node.__whZhTr;
    if (orig === undefined || zh === undefined) return;
    var text = orig.trim();
    dropWrap(node);
    // 按钮、按钮里的文字、页签这类窄空间，双语退回单行括号写法，避免把按钮撑高
    if (SET.bilingual && canBlockify(node) && node.parentNode) {
      var wrap = document.createElement('span');
      wrap.className = 'whzh-bi';
      var lineZh = document.createElement('span');
      lineZh.className = 'whzh-bi-zh';
      lineZh.textContent = zh;
      var lineEn = document.createElement('span');
      lineEn.className = 'whzh-bi-en';
      lineEn.textContent = text;
      wrap.appendChild(lineZh);
      wrap.appendChild(lineEn);
      node.nodeValue = '';
      node.__whZhOut = '';
      node.parentNode.insertBefore(wrap, node.nextSibling);
      node.__whZhWrap = wrap;
      return;
    }
    var out = SET.bilingual ? zh + OPEN_Q + text + CLOSE_Q : zh;
    node.__whZhOut = orig === text ? out : orig.replace(text, out);
    node.nodeValue = node.__whZhOut;
  }

  // 译文到手后不立刻替换，先等 SET.delay 毫秒再落笔（0 = 立即）
  function paintNodeLater(node) {
    var d = Math.max(0, parseInt(SET.delay, 10) || 0);
    if (!d) { paintNode(node); syncTip(); return; }
    var org = node.__whZhOrig, tr = node.__whZhTr;
    if (node.__whZhTimer) clearTimeout(node.__whZhTimer);
    node.__whZhTimer = setTimeout(function () {
      node.__whZhTimer = 0;
      if (node.__whZhOrig === org && node.__whZhTr === tr) paintNode(node);
      syncTip();
    }, d);
  }

  function paintBlockLater(b) {
    var d = Math.max(0, parseInt(SET.delay, 10) || 0);
    if (!d) { paintBlock(b); syncTip(); return; }
    var org = b.__whZhBlockOrig, tr = b.__whZhBlockTr;
    if (b.__whZhTimer) clearTimeout(b.__whZhTimer);
    b.__whZhTimer = setTimeout(function () {
      b.__whZhTimer = 0;
      if (b.__whZhBlockOrig === org && b.__whZhBlockTr === tr) paintBlock(b);
      syncTip();
    }, d);
  }

  var tipEl = null;
  function ensureTip() {
    if (tipEl && tipEl.parentNode === document.body) return tipEl;
    if (!document.body) return null;
    tipEl = el('div', 'whzh-tip');
    tipEl.__whZhOwn = 1;
    var dot = el('i', '');
    var tx = el('span', 'whzh-tip-t', '正在翻译…');
    tipEl.appendChild(dot);
    tipEl.appendChild(tx);
    document.body.appendChild(tipEl);
    return tipEl;
  }

  function placeTip() {
    if (!tipEl || !ctlEl) return;
    var r = ctlEl.getBoundingClientRect();
    if (!r || !r.width) return;
    var vw = document.documentElement.clientWidth || window.innerWidth;
    tipEl.style.top = Math.round(r.bottom + 6) + 'px';
    tipEl.style.left = 'auto';
    tipEl.style.right = Math.round(vw - r.right) + 'px';
  }

  // 队列里还有没译完的条目时，在开关下面挂一个「正在翻译…」的小提示
  function coolingCount() {
    var now = Date.now(), n = 0;
    for (var k in cooling) {
      if (cooling[k] > now) { n++; tries[k] = (tries[k] || 0); }
    }
    return n;
  }

  function syncTip() {
    if (!document.body) return;
    var n = queue.length + active + coolingCount();
    var on = !!SET.enabled && n > 0;
    var t = ensureTip();
    if (!t) return;
    if (!on) { t.style.display = 'none'; return; }
    var lab = t.querySelector('.whzh-tip-t');
    var waitSec = 0;
    try {
      var until = Math.max(throttleUntil, gTCoolUntil, googleCoolUntil);
      if (until > Date.now()) waitSec = Math.ceil((until - Date.now()) / 1000);
    } catch (e) { waitSec = 0; }
    if (lab) lab.textContent = '正在翻译… 余 ' + n + ' 条' +
      (waitSec ? ('（接口限流，约 ' + waitSec + ' 秒后重试）') : '');
    t.style.display = 'flex';
    placeTip();
  }

  function repaintAll() {
    if (!document.body) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      if (node.__whZhOrig !== undefined && node.__whZhTr !== undefined) paintNode(node);
    }
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      if (all[i].__whZhBlockTr !== undefined) paintBlock(all[i]);
    }
  }

  // 行内元素：段子里夹了 <code>/<b>/<a> 时不能按文本节点切碎翻，否则中英夹杂
  var INLINE_TAGS = {
    A: 1, ABBR: 1, B: 1, BDI: 1, BDO: 1, BR: 1, CITE: 1, CODE: 1, DATA: 1, DFN: 1,
    EM: 1, I: 1, IMG: 1, KBD: 1, MARK: 1, Q: 1, S: 1, SAMP: 1, SMALL: 1, SPAN: 1,
    STRONG: 1, SUB: 1, SUP: 1, TIME: 1, U: 1, VAR: 1, WBR: 1
  };

  function mixedInlineBlock(el) {
    if (!el || el.nodeType !== 1) return false;
    var kids = el.childNodes, hasInline = false;
    for (var i = 0; i < kids.length; i++) {
      var c = kids[i];
      if (c.nodeType !== 1) continue;
      if (!INLINE_TAGS[c.tagName]) return false;
      if (c.tagName !== 'BR') hasInline = true;
    }
    return hasInline;
  }

  function blockedEl(el) {
    var p = el;
    while (p && p.nodeType === 1) {
      if (SKIP_TAGS[p.tagName]) return true;
      var cls = p.className;
      if (cls && SKIP_CLASS.test(String(cls))) return true;
      p = p.parentNode;
    }
    return false;
  }

  // 段落块：只允许「改文字值 / 改 display / 追加我们自己建的节点」，
  // 绝不删除或重建 React 管理的任何节点，否则 React 重绘时会报
  // Failed to execute 'removeChild' on 'Node'。
  function blockSnap(b) {
    var list = b.__whZhBlockTexts || [];
    var tw = document.createTreeWalker(b, NodeFilter.SHOW_TEXT, null);
    var n, i, known;
    while ((n = tw.nextNode())) {
      if (n.parentNode && n.parentNode.__whZhOwn) continue;
      var own = false;
      var up = n.parentNode;
      while (up && up.nodeType === 1) {
        if (up.__whZhOwn) { own = true; break; }
        up = up.parentNode;
      }
      if (own) continue;
      known = null;
      for (i = 0; i < list.length; i++) if (list[i].n === n) { known = list[i]; break; }
      if (known) {
        if (n.nodeValue) known.v = n.nodeValue; // React 又写了新文案，更新留档
      } else {
        list.push({ n: n, v: n.nodeValue });
      }
    }
    b.__whZhBlockTexts = list;
    return list;
  }

  function blockText(b) {
    blockSnap(b);
    var list = b.__whZhBlockTexts || [];
    var parts = [];
    for (var i = 0; i < list.length; i++) {
      var t = list[i].n;
      if (!t || !t.parentNode) continue;
      // 用原始英文拼，而不是当前值：句首的 <strong> 可能已经单独译成中文，
      // 混着中文的整段文本永远匹配不回上一版，React 重绘后这段就卡在英文上
      parts.push(String(t.__whZhOrig !== undefined ? t.__whZhOrig : t.nodeValue || ''));
    }
    return parts.join('');
  }

  function paintBlock(b) {
    var tr = b.__whZhBlockTr;
    if (tr === undefined) return;
    var list = blockSnap(b);
    for (var i = 0; i < list.length; i++) {
      if (list[i].n) list[i].n.nodeValue = ''; // 清空但不删节点
    }
    var hidden = b.__whZhBlockHidden || (b.__whZhBlockHidden = []);
    var els = b.querySelectorAll('*');
    for (var k = 0; k < els.length; k++) {
      var e = els[k];
      if (e.__whZhOwn) continue;
      if (e.tagName === 'IMG' || e.tagName === 'BR') continue;
      if (!INLINE_TAGS[e.tagName]) continue;
      if (hidden.indexOf(e) === -1) hidden.push(e);
      e.style.display = 'none'; // 只收起来，不删除
    }
    var wrap = b.__whZhBlockWrap;
    if (!wrap || wrap.parentNode !== b) {
      wrap = document.createElement('span');
      wrap.className = 'whzh-bi';
      wrap.__whZhOwn = 1;
      b.appendChild(wrap);
      b.__whZhBlockWrap = wrap;
    }
    wrap.innerHTML = ''; // 这是我们自己建的节点，可以随便重建
    var z = document.createElement('span');
    z.className = 'whzh-bi-zh';
    z.textContent = tr;
    wrap.appendChild(z);
    if (SET.bilingual) {
      var en = document.createElement('span');
      en.className = 'whzh-bi-en';
      en.textContent = b.__whZhBlockOrig;
      wrap.appendChild(en);
    }
  }

  function restoreBlock(b) {
    var list = b.__whZhBlockTexts || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].n && list[i].n.parentNode) list[i].n.nodeValue = list[i].v;
    }
    var hidden = b.__whZhBlockHidden || [];
    for (var k = 0; k < hidden.length; k++) {
      if (hidden[k].style && hidden[k].style.display === 'none') hidden[k].style.display = '';
    }
    var wrap = b.__whZhBlockWrap;
    if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap); // 只删自己的节点
    delete b.__whZhBlockWrap;
    delete b.__whZhBlockHidden;
    delete b.__whZhBlockTexts;
    delete b.__whZhBlockOrig;
    delete b.__whZhBlockTr;
  }

  function sweep() {
    if (!document.body || !SET.enabled) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var node;
    var pending = [];
    while ((node = walker.nextNode())) {
      var value = node.nodeValue;
      if (!value || value.length > MAX_TEXT) continue;
      var inOwn = false;
      var up = node.parentNode;
      while (up && up.nodeType === 1) {
        if (up.__whZhOwn) { inOwn = true; break; }
        up = up.parentNode;
      }
      if (inOwn) continue; // 我们自己生成的块
      var host = node.parentNode;
      var managed = null;
      var walkUp = host;
      while (walkUp && walkUp.nodeType === 1) {
        if (walkUp.__whZhBlockTr !== undefined) { managed = walkUp; break; }
        walkUp = walkUp.parentNode;
      }
      if (managed) {
        if (pending.indexOf(managed) === -1) pending.push(managed);
        continue;
      }
      if (host && host.nodeType === 1 && mixedInlineBlock(host)) {
        // 这一整段交给段落级翻译，碎片先不碰
        if (pending.indexOf(host) === -1) pending.push(host);
        continue;
      }
      if (node.__whZhOrig !== undefined) {
        if (node.__whZhTimer) continue; // 译文已就绪，正等延迟落笔
        if (node.nodeValue === node.__whZhOut) continue;
        // 外部把文案换回英文了，重新来过
        dropWrap(node);
        delete node.__whZhOrig; delete node.__whZhTr; delete node.__whZhOut;
        value = node.nodeValue;
        if (!value) continue;
      }
      var text = value.trim();
      if (!text || !/[A-Za-z]/.test(text)) continue;
      if (blocked(node)) continue; // 先判跳过，否则代码块里的每行都会被真的发去翻译
      var zh = translate(text);
      if (!zh) continue;
      node.__whZhOrig = value;
      node.__whZhTr = zh;
      paintNodeLater(node);
    }
    for (var j = 0; j < pending.length; j++) {
      var b = pending[j];
      if (blockedEl(b)) continue;
      var full = String(blockText(b) || '').replace(/\s+/g, ' ').trim();
      if (!full || full.length > MAX_TEXT) continue;
      if (!/[A-Za-z]/.test(full)) continue;
      if (b.__whZhBlockTr !== undefined && b.__whZhBlockOrig === full) {
        if (b.__whZhTimer) continue;
        paintBlockLater(b); // 文案没变，只是 React 又把英文写回来了，重新压一遍
        continue;
      }
      var bz = translate(full);
      if (!bz) continue;
      b.__whZhBlockOrig = full;
      b.__whZhBlockTr = bz;
      paintBlockLater(b);
    }
  }

  var timer = 0;
  function schedule() {
    if (timer) return;
    timer = setTimeout(function () {
      timer = 0;
      try { ensureHeader(); } catch (e) { /* 顶部还没渲染好就下次再说 */ }
      try { sweep(); } catch (e) { /* 渲染中途出错就等下一次 */ }
      syncTip();
    }, 120);
  }

  /* ===== 汉化开关 + 设置面板 ===== */
  var SET_KEY = 'windhawk-zh-cn-settings-v1';
  var SET = (function () {
    var def = { enabled: true, longText: true, shortLabels: true, bilingual: false, engine: 'auto', delay: 0, packWorkers: 3 };
    try {
      var raw = localStorage.getItem(SET_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        for (var k in def) if (o[k] !== undefined) def[k] = o[k];
      }
    } catch (e) { /* 读不到就用默认 */ }
    try {
      var oldKeys = ['msKey', 'msRegion', 'bdAppid', 'bdKey'];
      var raw0 = localStorage.getItem(SET_KEY);
      if (raw0 && oldKeys.some(function (k) { return raw0.indexOf('"' + k + '"') >= 0; })) {
        localStorage.removeItem(SET_KEY);
      }
    } catch (e) { /* 清不掉就等下次保存覆盖 */ }
    def.packWorkers = Math.min(6, Math.max(1, parseInt(def.packWorkers, 10) || 3));
    if (def.engine !== 'google' && def.engine !== 'mymemory') def.engine = 'auto';
    return def;
  })();

  function saveSettings() {
    try { localStorage.setItem(SET_KEY, JSON.stringify(SET)); } catch (e) { /* 配额满就只在内存里生效 */ }
  }

  var CSS_ID = 'whzh-style';
  var CSS_TEXT = [
    '.whzh-ctl{display:flex;align-items:center;gap:8px;height:34px;padding:0 10px;',
    'border:1px solid #3c3c3c;border-radius:4px;background:#2a2a2a;color:#e6e6e6;',
    'font-size:13px;line-height:1;cursor:pointer;user-select:none;white-space:nowrap;',
    'font-family:inherit;box-sizing:border-box;}',
    '.whzh-ctl:hover{background:#333;}',
    '.whzh-ctl.on .whzh-sw{background:#0078d4;}',
    '.whzh-ctl.on .whzh-sw i{left:17px;}',
    '.whzh-sw{position:relative;width:32px;height:16px;border-radius:8px;background:#5a5a5a;',
    'transition:background .15s;flex:0 0 auto;}',
    '.whzh-sw i{position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:6px;',
    'background:#fff;transition:left .15s;}',
    '.whzh-gear{padding-left:2px;color:#9d9d9d;font-size:14px;}',
    '.whzh-ctl:hover .whzh-gear{color:#dcdcdc;}',
    '.whzh-mask{position:fixed;left:0;top:0;right:0;bottom:0;background:rgba(0,0,0,.55);',
    'display:flex;align-items:flex-start;justify-content:center;padding-top:56px;z-index:2147483000;}',
    '.whzh-dlg{width:min(880px,86vw);max-height:82vh;overflow:auto;background:#1f1f1f;',
    'border:1px solid #3c3c3c;border-radius:6px;box-shadow:0 12px 36px rgba(0,0,0,.55);',
    'color:#dcdcdc;font-size:13px;font-family:inherit;}',
    '.whzh-dlg-h{display:flex;align-items:center;justify-content:space-between;',
    'padding:14px 18px;border-bottom:1px solid #3c3c3c;font-size:15px;font-weight:600;}',
    '.whzh-x{cursor:pointer;color:#9d9d9d;font-size:16px;padding:0 4px;}',
    '.whzh-x:hover{color:#fff;}',
    '.whzh-sec{padding:6px 18px 14px;}',
    '.whzh-sec h6{margin:12px 0 8px;font-size:12px;letter-spacing:.4px;color:#9d9d9d;font-weight:600;}',
    '.whzh-row{display:flex;align-items:flex-start;justify-content:space-between;gap:24px;',
    'padding:12px 14px;border:1px solid #333;border-radius:4px;background:#242424;margin-bottom:8px;}',
    '.whzh-row .t{font-weight:600;margin-bottom:4px;}',
    '.whzh-row .d{color:#9d9d9d;font-size:12px;line-height:1.5;}',
    '.whzh-segs{display:flex;gap:8px;padding:0 14px 4px;}',
    '.whzh-seg{flex:1;padding:9px 10px;border:1px solid #3c3c3c;border-radius:4px;',
    'background:#242424;color:#cfcfcf;cursor:pointer;text-align:center;font-size:12px;font-family:inherit;}',
    '.whzh-seg.sel{border-color:#0078d4;background:#0d3a5c;color:#fff;}',
    '.whzh-foot{position:sticky;bottom:0;z-index:6;display:flex;justify-content:flex-end;gap:10px;',
    'padding:12px 18px;border-top:1px solid #3c3c3c;background:#1f1f1f;}',
    '.whzh-btn{padding:7px 18px;border-radius:4px;border:1px solid #3c3c3c;background:#2a2a2a;',
    'color:#e6e6e6;cursor:pointer;font-size:13px;font-family:inherit;}',
    '.whzh-btn:hover{background:#333;}',
    '.whzh-btn.primary{border-color:#0078d4;background:#0078d4;color:#fff;}',
    '.whzh-btn.primary:hover{background:#1a88dd;}',
    '.whzh-bi{display:block;}',
    '.whzh-bi-zh{display:block;}',
    '.whzh-bi-en{display:block;font-size:11px;line-height:1.5;color:#9a9a9a;margin-top:2px;opacity:.92;}',
    '.whzh-tip{position:fixed;z-index:2147483000;display:none;align-items:center;gap:6px;',
    'height:22px;padding:0 9px;border:1px solid #3c3c3c;border-radius:4px;background:#2a2a2a;',
    'color:#c8c8c8;font-size:12px;line-height:20px;pointer-events:none;white-space:nowrap;',
    'box-shadow:0 2px 8px rgba(0,0,0,.35);}',
    '.whzh-tip i{width:7px;height:7px;border-radius:50%;background:#0a84ff;animation:whzh-pulse 1s ease-in-out infinite;}',
    '@keyframes whzh-pulse{0%,100%{opacity:.35;transform:scale(.8);}50%{opacity:1;transform:scale(1);}}',
    '.whzh-num{width:92px;height:28px;background:#2a2a2a;border:1px solid #3c3c3c;border-radius:4px;',
    'color:#e6e6e6;font-size:13px;font-family:inherit;padding:0 8px;text-align:right;}',
    '.whzh-btn[disabled]{opacity:.45;cursor:default;}'
  ].join('');

  function injectCss() {
    if (document.getElementById(CSS_ID)) return;
    var st = document.createElement('style');
    st.id = CSS_ID;
    st.textContent = CSS_TEXT;
    (document.head || document.documentElement).appendChild(st);
  }

  var ctlEl = null;

  function findHeaderAnchor() {
    var list = document.querySelectorAll('button');
    var about = null, home = null;
    for (var i = 0; i < list.length; i++) {
      var t = String(list[i].textContent || '');
      if (t.length > 24) continue;
      if (!about && /(关于|About)/i.test(t)) about = list[i];
      if (!home && /(主页|Home|ホーム|Startseite|Accueil| inicio)/i.test(t)) home = list[i];
    }
    return about || home;
  }

  var padNode = null;
  // 列表右边界：卡片网格里所有卡片的右缘（这就是用户看的那条竖线）
  function listRightEdge() {
    var btns = document.querySelectorAll('button');
    var first = null;
    for (var i = 0; i < btns.length; i++) {
      var t = String(btns[i].textContent || '').trim();
      if (t === '详情' || t === '移除' || t === '安装') { first = btns[i]; break; }
    }
    if (!first) return 0;
    var el = first;
    for (var d = 0; d < 7 && el && el.parentNode; d++) {
      el = el.parentNode;
      if (el.tagName === 'BODY' || el.tagName === 'HTML') break;
      var kids = el.children || [];
      if (kids.length < 3 || kids.length > 80) continue;
      var n = 0, rightMax = 0;
      for (var k = 0; k < kids.length; k++) {
        if (!kids[k].querySelector || !kids[k].querySelector('button')) continue;
        n++;
        var kr = kids[k].getBoundingClientRect ? kids[k].getBoundingClientRect() : null;
        if (kr && kr.right > rightMax) rightMax = kr.right;
      }
      if (n !== kids.length) continue;              // 每个格子都得是卡片
      var gr = el.getBoundingClientRect();
      if (!gr || gr.height < 100) continue;         // 成片的卡片区，排除工具栏
      if (rightMax > 0) return rightMax;
    }
    return 0;
  }

  var padNode = null;
  // 装按钮的那一排：子元素全是按钮（或每个子元素里正好一个按钮），且只有一行高
  function navRow(anchor) {
    var p = anchor.parentNode;
    for (var i = 0; i < 6 && p && p.nodeType === 1; i++) {
      if (p.tagName === 'BODY' || p.tagName === 'HTML') break;
      var kids = p.children || [];
      if (kids.length >= 3 && kids.length <= 8) {
        var n = 0;
        for (var k = 0; k < kids.length; k++) {
          var kid = kids[k];
          if (kid === ctlEl) continue;
          if (kid.tagName === 'BUTTON') { n++; continue; }
          if (kid.querySelectorAll && kid.querySelectorAll('button').length === 1) n++;
        }
        var pr = p.getBoundingClientRect();
        if (n >= 3 && pr && pr.height > 0 && pr.height <= 90) return p;
        return null;        // 到这一层已经不是按钮排了，别再往上乱加内边距
      }
      p = p.parentNode;
    }
    return null;
  }

  function placeCtl(anchor) {
    if (!ctlEl) return;
    // 只清挂在 body 上的重复控件（设置面板里的开关也用 .whzh-ctl，绝不能碰）
    var kids = document.body.children;
    for (var a = kids.length - 1; a >= 0; a--) {
      if (kids[a] !== ctlEl && kids[a].classList && kids[a].classList.contains('whzh-ctl')) {
        document.body.removeChild(kids[a]);
      }
    }
    var r = anchor.getBoundingClientRect();
    if (!r || !r.right) {
      ctlEl.style.top = '64px';
      ctlEl.style.left = 'auto';
      ctlEl.style.right = '16px';
      return;
    }
    var cr = ctlEl.getBoundingClientRect();
    var w = (cr && cr.width) || ctlEl.offsetWidth || 132;
    var gap = 8;
    var row = navRow(anchor);
    // 对齐基线 L = 列表右缘；没有列表就退回按钮排右缘，再退回窗口
    var L = 0;
    try { L = listRightEdge(); } catch (e) { L = 0; }
    if (!L) {
      var rr0 = row ? row.getBoundingClientRect() : null;
      L = (rr0 && rr0.right) ? rr0.right : ((document.documentElement.clientWidth || window.innerWidth) - 12);
    }
    // 用不含滚动条的视口宽度算 right 偏移，否则会多出滚动条那十几个像素
    var vw = document.documentElement.clientWidth || window.innerWidth;
    L = Math.min(L, vw - 8);
    // r.right + 已加过的内边距 = 没加内边距时按钮排的右缘
    var baseRight = r.right + (row && row.__whZhApplied ? row.__whZhApplied : 0);
    if (row) {
      if (row.__whZhPad === undefined) {
        var cs = window.getComputedStyle(row);
        row.__whZhPad = parseFloat(cs.paddingRight) || 0;
      }
      if (padNode && padNode !== row) padNode.style.paddingRight = (padNode.__whZhPad || 0) + 'px';
      padNode = row;
      var wantRight = L - w - gap;      // 按钮右缘要让到控件左侧再空一格
      var extra = Math.round(baseRight - wantRight);
      if (extra < 0) extra = 0;
      row.style.paddingRight = (row.__whZhPad + extra) + 'px';
      row.__whZhApplied = extra;
      var bs = row.querySelectorAll('button');
      for (var b = 0; b < bs.length; b++) bs[b].style.flexShrink = '0';
      r = anchor.getBoundingClientRect();
    }
    var h = Math.round(r.height || 34);
    if (h < 28) h = 34;
    if ((L - w) < r.right + gap - 1) {
      // 列表太窄、挤不下：退回「关于」下方，布局一律不动
      if (row) { row.style.paddingRight = row.__whZhPad + 'px'; row.__whZhApplied = 0; }
      padNode = null;
      ctlEl.style.top = Math.round(r.bottom + gap) + 'px';
      ctlEl.style.left = 'auto';
      ctlEl.style.right = Math.round(Math.max(12, (vw || window.innerWidth) - r.right)) + 'px';
      ctlEl.style.height = 34 + 'px';
      placeTip();
      return;
    }
    // 用 right 定位：右缘精确压在列表右缘那条线上，不受宽度测量误差影响
    ctlEl.style.left = 'auto';
    ctlEl.style.right = (vw - L) + 'px';
    ctlEl.style.top = Math.round(r.top) + 'px';
    ctlEl.style.height = h + 'px';
    placeTip();
  }

  function syncCtl() {
    if (!ctlEl) return;
    if (SET.enabled) ctlEl.classList.add('on');
    else ctlEl.classList.remove('on');
    var lab = ctlEl.querySelector('.whzh-label');
    if (lab) lab.textContent = SET.enabled ? '汉化已开' : '汉化已关';
  }

  function ensureHeader() {
    injectCss();
    var anchor = findHeaderAnchor();
    if (ctlEl && ctlEl.isConnected) {
      syncCtl();
      if (anchor) placeCtl(anchor);
      return;
    }
    if (!anchor) return;
    ctlEl = document.createElement('div');
    ctlEl.className = 'whzh-ctl';
    ctlEl.title = '点击开关汉化；点齿轮打开设置';
    ctlEl.innerHTML = '<span class="whzh-label">汉化</span>' +
      '<span class="whzh-sw"><i></i></span><span class="whzh-gear">⚙</span>';
    ctlEl.addEventListener('click', function (ev) {
      if (ev.target && ev.target.className === 'whzh-gear') {
        ev.stopPropagation();
        openSettings();
        return;
      }
      SET.enabled = !SET.enabled;
      saveSettings();
      if (SET.enabled) { reFetchTranslations(); } else { restoreAll(); }
      syncCtl();
    });
    ctlEl.style.position = 'fixed';
    ctlEl.style.zIndex = '2147483000';
    document.body.appendChild(ctlEl);
    placeCtl(anchor);
    syncCtl();
  }

  // 打开开关时重新抓取：清掉失败冷却和通道冷却，让还没翻的条目重新发一次请求。
  // 以前失败一次要等 60-90 秒才自动重试，且有通道冷却时压根不会发请求，
  // 用户关了再打开只能看到同一批英文，只能靠等。
  function reFetchTranslations() {
    for (var k in cooling) delete cooling[k];
    for (var t in tries) delete tries[t];
    gTCoolUntil = 0;
    googleCoolUntil = 0;
    queue.length = 0;
    diag.err = '';
    schedule();
    setTimeout(schedule, 300);
  }

  function restoreAll() {
    if (!document.body) return;
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      if (node.__whZhOrig !== undefined) {
        dropWrap(node);
        node.nodeValue = node.__whZhOrig;
        delete node.__whZhOrig;
        delete node.__whZhTr;
        delete node.__whZhOut;
      }
    }
    var all = document.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      if (all[i].__whZhBlockTr !== undefined) restoreBlock(all[i]);
    }
    queue.length = 0;
    syncTip();
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  var dlg = null;

  function openSettings() {
    injectCss();
    if (dlg) {
      dlg.style.display = 'flex';
      refreshDlg();
      var o = dlg.querySelector('.whzh-off-n');
      if (o) o.textContent = offlineStatusText();
      var dg = dlg.querySelector('.whzh-diag');
      if (dg) dg.textContent = diagText();
      var ob = dlg.querySelector('.whzh-off-btn');
      if (ob) { ob.textContent = offlineBtnText(); ob.disabled = false; }
      return;
    }

    var draft = {
      enabled: SET.enabled, longText: SET.longText,
      shortLabels: SET.shortLabels, bilingual: SET.bilingual, engine: SET.engine,
      delay: Math.max(0, parseInt(SET.delay, 10) || 0),
      packWorkers: Math.min(6, Math.max(1, parseInt(SET.packWorkers, 10) || 3))
    };

    dlg = el('div', 'whzh-mask');
    var box = el('div', 'whzh-dlg');

    var head = el('div', 'whzh-dlg-h');
    head.appendChild(el('span', '', '汉化补丁设置'));
    var x = el('span', 'whzh-x', '✕');
    x.addEventListener('click', closeDlg);
    head.appendChild(x);
    box.appendChild(head);

    function row(title, desc, getVal, setVal) {
      var r = el('div', 'whzh-row');
      var left = el('div', '');
      left.appendChild(el('div', 't', title));
      left.appendChild(el('div', 'd', desc));
      r.appendChild(left);
      var sw = el('div', 'whzh-ctl');
      sw.style.height = '26px';
      sw.style.padding = '0 8px';
      sw.innerHTML = '<span class="whzh-sw"><i></i></span>';
      function paint() {
        if (getVal()) sw.classList.add('on');
        else sw.classList.remove('on');
      }
      paint();
      sw.addEventListener('click', function () { setVal(!getVal()); paint(); });
      r.appendChild(sw);
      return r;
    }

    function numRow(title, desc, get, set, minVal, maxVal, stepVal) {
      var r = el('div', 'whzh-row');
      var left = el('div', '');
      left.appendChild(el('div', 't', title));
      left.appendChild(el('div', 'd', desc));
      r.appendChild(left);
      var inp = el('input', 'whzh-num');
      inp.type = 'number';
      var lo = (minVal === undefined) ? 0 : minVal;
      var hi = (maxVal === undefined) ? 5000 : maxVal;
      var st = (stepVal === undefined) ? 50 : stepVal;
      inp.min = String(lo);
      inp.max = String(hi);
      inp.step = String(st);
      inp.value = String(get());
      inp.addEventListener('input', function () {
        var v = parseInt(inp.value, 10);
        if (isNaN(v) || v < lo) v = lo;
        if (v > hi) v = hi;
        if (String(v) !== inp.value) inp.value = String(v);
        set(v);
      });
      r.appendChild(inp);
      return r;
    }

    // 常规
    var sec1 = el('div', 'whzh-sec');
    sec1.appendChild(el('h6', '', '常规'));
    sec1.appendChild(row('启用界面汉化', '关闭后界面立即恢复英文原文，缓存保留。',
      function () { return draft.enabled; },
      function (v) { draft.enabled = v; }));
    sec1.appendChild(row('翻译长正文', '详情页 README 那种大段英文说明。关闭则只翻标题与短句。',
      function () { return draft.longText; },
      function (v) { draft.longText = v; }));
    sec1.appendChild(row('翻译设置项短标签', '如 Make expandable、Hide duplicates 这类两个词的开关标题。',
      function () { return draft.shortLabels; },
      function (v) { draft.shortLabels = v; }));
    sec1.appendChild(row('中英双语', '译文后面用括号保留英文原文，方便对照；开启后长正文会明显变长。',
      function () { return draft.bilingual; },
      function (v) { draft.bilingual = v; }));
    sec1.appendChild(numRow('译文替换延迟（毫秒）',
      '译文拿到后先等这么久再替换页面文字，避免整屏跳动。0 = 立即替换，默认 0。',
      function () { return draft.delay; },
      function (v) { draft.delay = v; }));
    box.appendChild(sec1);

    // 引擎
    var sec2 = el('div', 'whzh-sec');
    sec2.appendChild(el('h6', '', '翻译引擎'));
    var segs = el('div', 'whzh-segs');
    var defs = [
      ['auto', '自动（Google → MyMemory）'],
      ['google', '仅 Google（两个通道）'],
      ['mymemory', '仅 MyMemory']
    ];
    var segEls = [];
    defs.forEach(function (d) {
      var s = el('div', 'whzh-seg', d[1]);
      if (draft.engine === d[0]) s.classList.add('sel');
      s.addEventListener('click', function () {
        draft.engine = d[0];
        segEls.forEach(function (o) { o.classList.remove('sel'); });
        s.classList.add('sel');
      });
      segEls.push(s);
      segs.appendChild(s);
    });
    sec2.appendChild(segs);
    var hint = el('div', 'd', '内置词表与已缓存译文优先于引擎，不会被替换。');
    hint.style.padding = '6px 14px 0';
    hint.style.color = '#9d9d9d';
    hint.style.fontSize = '12px';
    sec2.appendChild(hint);
    box.appendChild(sec2);

    // 缓存
    var sec3 = el('div', 'whzh-sec');
    sec3.appendChild(el('h6', '', '缓存与词表'));
    var info = el('div', 'whzh-row');
    var left2 = el('div', '');
    left2.appendChild(el('div', 't', '本地译文缓存'));
    var dinfo = el('div', 'd', '');
    left2.appendChild(dinfo);
    info.appendChild(left2);
    var clr = el('button', 'whzh-btn', '清空缓存');
    clr.addEventListener('click', function () {
      try { localStorage.removeItem(CACHE_KEY); } catch (e) { /* 忽略 */ }
      for (var k in cache) delete cache[k];
      refreshDlg(dinfo);
    });
    info.appendChild(clr);
    var refetchBtn = el('button', 'whzh-btn', '重新抓取');
    refetchBtn.addEventListener('click', function () {
      reFetchTranslations();
    });
    info.appendChild(refetchBtn);
    sec3.appendChild(info);
    box.appendChild(sec3);

    // 离线包
    var sec4 = el('div', 'whzh-sec');
    sec4.appendChild(el('h6', '', '离线翻译包'));
    var orow = el('div', 'whzh-row');
    var oleft = el('div', '');
    oleft.appendChild(el('div', 't', '离线翻译包（预抓取译文）'));
    var oinfo = el('div', 'd whzh-off-n', offlineStatusText());
    oleft.appendChild(oinfo);
    orow.appendChild(oleft);
    var obtn = el('button', 'whzh-btn whzh-off-btn', offlineBtnText());
    obtn.addEventListener('click', function () {
      if (packRunning) {
        packStop = true;
        oinfo.textContent = '正在停止…';
        return;
      }
      downloadPack(function (msg) {
        oinfo.textContent = msg;
        obtn.textContent = offlineBtnText();
      }, function (msg) {
        oinfo.textContent = msg;
        obtn.textContent = offlineBtnText();
        if (SET.enabled) { repaintAll(); schedule(); }
      });
      obtn.textContent = offlineBtnText();
    });
    orow.appendChild(obtn);
    sec4.appendChild(orow);
    sec4.appendChild(numRow('预翻译并发',
      '同时向翻译接口发几条请求：1-6，默认 3。调高下载更快，但更容易被限流；被限流会自动等待重试。',
      function () { return draft.packWorkers; },
      function (v) { draft.packWorkers = v; }, 1, 6, 1));
    var ohint = el('div', 'd', '点一下把官方目录里全部 Mod 的名称与简介预先翻好存到本地；之后断网或翻译接口限流时优先读本地。');
    ohint.style.padding = '6px 14px 0';
    ohint.style.color = '#9d9d9d';
    ohint.style.fontSize = '12px';
    sec4.appendChild(ohint);
    var drow = el('div', 'whzh-row');
    var dleft = el('div', '');
    dleft.appendChild(el('div', 't', '翻译通道状态'));
    dleft.appendChild(el('div', 'd whzh-diag', diagText()));
    drow.appendChild(dleft);
    sec4.appendChild(drow);
    box.appendChild(sec4);

    function refreshDlg(target) {
      var n = Object.keys(cache).length;
      target = target || dlg.querySelector('.whzh-cache-n');
      if (target) target.textContent = '当前已缓存 ' + n + ' 条译文；内置词表 ' +
        Object.keys(PAIRS).length + ' 条。';
    }

    dinfo.className = 'd whzh-cache-n';
    refreshDlg(dinfo);

    var foot = el('div', 'whzh-foot');
    var cancel = el('button', 'whzh-btn', '取消');
    cancel.addEventListener('click', closeDlg);
    var save = el('button', 'whzh-btn primary', '保存');
    save.addEventListener('click', function () {
      SET.enabled = draft.enabled;
      SET.longText = draft.longText;
      SET.shortLabels = draft.shortLabels;
      SET.bilingual = draft.bilingual;
      SET.engine = draft.engine;
      SET.delay = Math.max(0, parseInt(draft.delay, 10) || 0);
      SET.packWorkers = Math.min(6, Math.max(1, parseInt(draft.packWorkers, 10) || 3));
      saveSettings();
      closeDlg();
      if (SET.enabled) { repaintAll(); reFetchTranslations(); } else { restoreAll(); }
      syncCtl();
    });
    foot.appendChild(cancel);
    foot.appendChild(save);
    box.appendChild(foot);

    dlg.appendChild(box);
    dlg.addEventListener('mousedown', function (ev) {
      if (ev.target === dlg) closeDlg();
    });
    document.body.appendChild(dlg);
  }

  window.addEventListener('resize', function () {
    try { ensureHeader(); } catch (e) { /* 忽略 */ }
  });

  function closeDlg() {
    if (dlg) dlg.style.display = 'none';
  }

  function start() {
    schedule();
    try {
      new MutationObserver(schedule).observe(document.documentElement, {
        childList: true, subtree: true, characterData: true
      });
    } catch (e) { /* 老引擎退化成一拍 */ }
    // 首屏之后补扫几次，遮住懒加载和分页的时差。
    [500, 1500, 3000].forEach(function (ms) { setTimeout(schedule, ms); });
    // 通道冷却结束、或者 React 一直没动时，也保证隔一会儿再扫一遍，避免整页停在英文。
    setInterval(function () { if (SET.enabled) schedule(); }, 20000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();