// بيانات المعارض والمشاريع (تستطيع تعديل أو إضافة أي معرض بسهولة هنا)
const galleryData = [
    {
        id: 1,
        title: "تقفيل واجهة uPVC مودرن",
        category: "upvc", // التصنيف (upvc, aluminum, balcony)
        categoryName: "uPVC وعزل حراري",
        coverImage: "images/تقفيل في المعرض.jpg", // صورة الغلاف الخارجي
        // أول صورة في الألبوم هي نفسها صورة الغلاف، ويمكنك إضافة صور تفاصيل بجانبها
        album: [
            "images/تقفيل في المعرض.jpg",
            "images/معرض تقفيل اساسي .jpg",
            "images/تقفيل معرض .jpeg",
            "images/تقفيل معرض .jpg",
             "images/pic 15 .jpeg"

          
        ]
    },
    {
        id: 2,
        title: "شبابيك ألومنتال فاخرة وزجاج دبل",
        category: "aluminum",
        categoryName: "ألومنتال عالي الجودة",
        coverImage: "images/اساسي معرض شباك مفصلي .jpg",
        album: [
            "images/شباك مطبخ pvc.jpeg",
             "images/شباك حمام .jpeg",
            "images/شباك حمام 2.jpeg",
            "images/شباك مطبخ 2.jpeg",
            "images/شباك مطبخ 3.jpeg",
            "images/شباك مطبخ معرض .jpeg",
            "images/شباك مطبخ.jpeg",
            "images/شباك مطبخ معرض .jpeg"
        ]
    },
    {
        id: 3,
        title: "أبواب uPVC زجاجية وسلاسة حركة",
        category: "upvc",
        categoryName: "uPVC أبواب وشابيك",
        coverImage: "images/معرض جرار اساسي .jpeg",
        album: [
            "images/ابواب جرار معرض.jpg",
            "images/ابواب حمام معرض .jpeg",
            "images/معرض ابواب باب مفصلي .jpeg",
            "images/معرض ابواب حمام .jpeg",
            "images/معرض باب حمام .jpg",
            "images/معرض جرار .jpg",
            "images/معرض جرار 2 .jpeg",
            "images/معرض جرار.jpeg",
            "images/معرض جرار.jpg",
            "images/ابواب حمام معرض .jpeg",
        ]
    }
];
document.addEventListener("DOMContentLoaded", () => {
    // كود تشغيل الفيديو تلقائياً فوراً
    const video = document.getElementById("reelVideo");
    if (video) {
        video.play().catch(error => {
            console.log("Auto-play was prevented:", error);
        });
    }
    
    // ... باقي الأكواد الموجودة لديك
});
// تحميل المعارض عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
    renderGallery(galleryData);

    // تفاعل القائمة في الهواتف المحمولة
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    // إخفاء شاشة التحميل الافتتاحية
    const loader = document.getElementById("intro-loader");
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }
    }, 1000);
});

// رسم المعارض في الصفحة الرئيسية
function renderGallery(items) {
    const grid = document.getElementById("galleryGrid");
    grid.innerHTML = "";

    if (items.length === 0) {
        grid.innerHTML = `<p style="text-align:center; grid-column:1/-1; color:#777;">لا توجد أعمال مضافة حالياً في هذا القسم.</p>`;
        return;
    }

    items.forEach(item => {
        const card = document.createElement("div");
        card.className = `gallery-item ${item.category}`;
        card.onclick = () => openModal(item.id);

        card.innerHTML = `
            <div class="gallery-img-wrapper">
                <img src="${item.coverImage}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <i class="fa-solid fa-magnifying-glass-plus gallery-zoom-icon"></i>
                    <h4>${item.title}</h4>
                    <p>${item.categoryName}</p>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// تصفية المعارض حسب التصنيف
function filterCategory(cat, event) {
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    if (cat === 'all') {
        renderGallery(galleryData);
    } else {
        const filtered = galleryData.filter(item => item.category === cat);
        renderGallery(filtered);
    }
}

// فتح النافذة المنبثقة (Modal) لعرض صور المعرض التفصيلية
function openModal(id) {
    const item = galleryData.find(p => p.id === id);
    if (!item) return;

    document.getElementById("modalTitle").innerText = item.title;
    document.getElementById("modalCategory").innerText = item.categoryName;
    
    // ضبط صورة الغلاف كصورة افتراضية عند فتح المودال
    const mainImg = document.getElementById("modalMainImg");
    mainImg.src = item.coverImage;

    // تحديث زر الواتساب للتواصل بخصوص هذا التصميم بالذات
    document.getElementById("modalWhatsappBtn").href = `https://wa.me/+201104814809?text=أهلاً%20أبو%20ربيع،%20أود%20الاستفسار%20عن%20هذا%20التصميم:%20${encodeURIComponent(item.title)}`;

    // تعبئة الصور المصغرة للألبوم
    const gridImages = document.getElementById("modalGridImages");
    gridImages.innerHTML = "";

    if (item.album && item.album.length > 0) {
        item.album.forEach(imgUrl => {
            const thumb = document.createElement("img");
            thumb.src = imgUrl;
            thumb.alt = item.title;
            thumb.onclick = () => {
                mainImg.src = imgUrl; // التبديل بين الصور عند الضغط
            };
            gridImages.appendChild(thumb);
        });
    }

    document.getElementById("galleryModal").style.display = "block";
}

// إغلاق النافذة
function closeModal() {
    document.getElementById("galleryModal").style.display = "none";
}

// إغلاق النافذة عند الضغط خارجها
window.onclick = function(event) {
    const modal = document.getElementById("galleryModal");
    if (event.target === modal) {
        closeModal();
    }
};
