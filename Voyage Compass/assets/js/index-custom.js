/* Custom JavaScript for Index Page */

// Random Background Images - From large images directory
const backgroundImages = [
    'large images/bangkok1.jpg',
    'large images/bangkok2.jpg',
    'large images/bangkok3.jpg',
    'large images/bangkok4.jpg',
    'large images/hongkong1.jpg',
    'large images/hongkong2.jpg',
    'large images/hongkong3.jpg',
    'large images/hongkong4.jpg',
    'large images/hongkong5.jpg',
    'large images/tokyo1.jpg',
    'large images/tokyo2.jpg',
    'large images/tokyo3.jpg',
    'large images/tokyo4.jpg',
    'large images/tokyo5.jpg',
    'large images/seoul1.jpg',
    'large images/seoul2.jpg',
    'large images/seoul3.jpg',
    'large images/seoul4.jpg',
    'large images/seoul5.jpg',
    'large images/singapore1.jpg',
    'large images/singapore2.jpg',
    'large images/singapore3.jpg',
    'large images/singapore4.jpg',
    'large images/singapore5.jpg',
    'large images/sydney1.jpg',
    'large images/sydney2.jpg',
    'large images/sydney3.jpg',
    'large images/sydney4.jpg',
    'large images/vancouver1.jpg',
    'large images/vancouver2.jpg',
    'large images/vancouver3.jpg',
    'large images/vancouver4.jpg',
    'large images/vancouver5.jpg',
    'large images/london1.jpg',
    'large images/london2.jpg',
    'large images/london3.jpg',
    'large images/london4.jpg',
    'large images/london5.jpg',
    'large images/sf.jpg',
    'large images/sf2.jpg',
    'large images/sf3.jpg',
    'large images/sf4.jpg',
    'large images/new_york_1.jpeg',
    'large images/nyc2.jpg',
    'large images/nyc3.jpg',
    'large images/nyc4.jpg'
];

// Set random background on page load
document.addEventListener('DOMContentLoaded', function() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const heroSection = document.getElementById('hero');
    heroSection.style.backgroundImage = `url('${backgroundImages[randomIndex]}')`;
});



// Smooth scrolling for menu items
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery item click handlers to navigate to city pages
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const cityName = this.querySelector('.gallery-item-title').textContent;
        
        // Map Chinese city names to their respective HTML files
        const cityMap = {
            '紐約': 'new-york-city.html',
            '舊金山': 'san-francisco.html',
            '倫敦': 'london.html',
            '新加坡': 'singapore.html',
            '雪梨': 'sydney.html',
            '溫哥華': 'vancouver.html',
            '首爾': 'seoul.html',
            '東京': 'tokyo.html',
            '曼谷': 'bangkok.html',
            '香港': 'hong-kong.html'
        };
        
        if (cityMap[cityName]) {
            window.location.href = cityMap[cityName];
        }
    });
}); 