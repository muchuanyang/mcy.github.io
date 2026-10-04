/**
 * 为正文里的根绝对路径资源自动补上 config.root 前缀
 *
 * 为什么需要：
 *   本博客部署在 GitHub Pages 的「项目仓库」mcy.github.io 下，地址带一层路径
 *   （root = /mcy.github.io/）。模板里的链接会经过 url_for() 自动加前缀，
 *   但**正文 Markdown 里的图片不会被处理** —— 写 /images/a.jpg 会指向
 *   https://muchuanyang.github.io/images/a.jpg 而 404。
 *
 * 这个过滤器在文章渲染完成后，把所有以单个 / 开头的 <img src> 补上 root 前缀，
 * 于是写文章时照常写 /images/xxx.jpg 就行，不必记前缀。
 *
 * 注意：已带前缀的、以及 // 开头的协议相对地址都不会被重复处理。
 */
hexo.extend.filter.register('after_post_render', function (data) {
  const root = String(this.config.root || '/').replace(/\/+$/, '');
  if (!root) return data; // root 为 / 时无需处理

  function prefix(html) {
    if (!html) return html;
    return html.replace(/(<img\b[^>]*\bsrc=")(\/[^"]*)"/gi, function (whole, pre, src) {
      if (src.startsWith('//')) return whole; // 协议相对地址，跳过
      if (src.startsWith(root + '/')) return whole; // 已带前缀，跳过
      return pre + root + src + '"';
    });
  }

  data.content = prefix(data.content);
  if (data.excerpt) data.excerpt = prefix(data.excerpt);
  return data;
});
