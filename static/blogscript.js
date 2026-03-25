{
    function renderBacklinks() {
        const anchorVoltarHTML=`
        <a hx-get="/pages/blog.html"
            hx-push-url="/blog"
            hx-target="closest main"
            hx-swap="outerHTML transition:true show:window:top"
            class="link-body-emphasis link-underline-opacity-75 link-underline-opacity-25-hover fs-3 mb-3">
            Voltar
        </a>`

        const main = document.currentScript.parentElement
        const blogsDiv = document.getElementById('related-entries')

        main.insertAdjacentHTML('afterbegin', anchorVoltarHTML)
        blogsDiv.insertAdjacentHTML('beforebegin', anchorVoltarHTML)
        htmx.process(main)
    }

    async function getBlogs() {
        try {
            const response = await fetch('/pages/blogs/blogs.json');
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    function renderBlog(blogData) {
        let blog = blogData
        const blogsDiv = document.getElementById('related-entries')
        const blogHTML =
        `
        <div class="card blog-post flex-shrink-0"
            hx-get="/pages/blogs/${blog.path}"
            hx-push-url="/blog/${blog.url}"
            hx-target="closest main"
            hx-swap="outerHTML transition:true show:window:top"
            data-category="${blog.category}">
            <img src="/static/${blog.image}" class="card-img-top" alt="tralalero tralala">
            <div class="card-body">
                <h3 class="card-title typewriter">${blog.title}</h3>
                <p class="card-text fs-6">${blog.description}</p>
            </div>
            <div class="card-footer">
                <small class="text-body-secondary">${blog.date}</small>
            </div>
        </div>
        `

        blogsDiv.insertAdjacentHTML('afterbegin', blogHTML)
    }

    function setupBlogsDiv() {
        const blogsDiv = document.getElementById('related-entries')
        titleHTML = '<p class="fs-3 fw-semibold">Entradas Relacionadas:</p>'
        blogsDiv.insertAdjacentHTML('beforebegin', titleHTML)

    }

    async function getBlogInfoFromURL(blogs) {
        let path = window.location.pathname
        const segments = path.split('/').filter(segment => segment.length > 0)
        path = segments[segments.length - 1]

        if (blogs) {
            let blog = blogs.find(blog => blog.url == path)
            return [blog.category, blog.url]
        }
    }

    async function renderRelatedEntries() {
        const blogsDiv = document.getElementById('related-entries')
        let blogs = await getBlogs()
        const [currentCategory, currentURL] = await getBlogInfoFromURL(blogs)

        blogs = blogs.filter(blog => blog.category === currentCategory && blog.url !== currentURL)
        if(blogs) {
            setupBlogsDiv()
            blogs.forEach(blog => renderBlog(blog))
            htmx.process(blogsDiv)
        }
    }

    renderBacklinks()
    renderRelatedEntries()
}