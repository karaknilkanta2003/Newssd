// Simple JavaScript Enhancement for SSD Course Website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Only add scroll to top and smooth scrolling, skip restructuring
    addScrollToTop();
    addSmoothScrolling();
    addSimpleTableEnhancement();
    startTime(); // Keep the original clock function
}

function restructureHTML() {
    // Find the main table and restructure it
    const mainTable = document.querySelector('table[align="center"][width="100%"]');
    if (mainTable && !document.querySelector('.main-container')) {
        // Create new structure
        const container = document.createElement('div');
        container.className = 'main-container';
        
        const rows = mainTable.querySelectorAll('tr');
        
        // Header (first row)
        if (rows[0]) {
            const headerDiv = document.createElement('div');
            headerDiv.className = 'header';
            headerDiv.innerHTML = rows[0].innerHTML;
            container.appendChild(headerDiv);
        }
        
        // Navigation (second row)
        if (rows[1]) {
            const navDiv = document.createElement('div');
            navDiv.className = 'navigation';
            const navContent = rows[1].querySelector('td').innerHTML;
            navDiv.innerHTML = `<div class="nav-links">${navContent}</div>`;
            container.appendChild(navDiv);
        }
        
        // Content sections
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        
        for (let i = 2; i < rows.length; i++) {
            const row = rows[i];
            const cell = row.querySelector('td');
            if (cell && cell.innerHTML.trim()) {
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'section';
                
                // Clone the cell content properly to preserve table structure
                const clonedContent = cell.cloneNode(true);
                sectionDiv.appendChild(clonedContent);
                contentDiv.appendChild(sectionDiv);
            }
        }
        
        container.appendChild(contentDiv);
        
        // Replace main table with new structure
        mainTable.parentNode.replaceChild(container, mainTable);
    }
    
    // Enhance other tables
    enhanceDataTables();
}

function enhanceDataTables() {
    const tables = document.querySelectorAll('table[border="1"]');
    tables.forEach(table => {
        // Skip tables that are already wrapped or are grading/rubric tables
        if (table.parentNode.classList && table.parentNode.classList.contains('table-wrapper')) {
            return;
        }
        
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
}

function addSimpleTableEnhancement() {
    // Just add simple styling to existing tables without restructuring
    const tables = document.querySelectorAll('table[border="1"]');
    tables.forEach(table => {
        table.style.borderRadius = '8px';
        table.style.overflow = 'hidden';
        table.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    });
}

function addScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-top';
    scrollButton.innerHTML = '↑';
    scrollButton.title = 'Scroll to top';
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Keep original clock functions
function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    
    const timeElement = document.getElementById('txt');
    if (timeElement) {
        timeElement.innerHTML = today.toLocaleDateString() + ' ' + h + ":" + m + ":" + s;
    }
    
    setTimeout(startTime, 1000);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i; }
    return i;
}