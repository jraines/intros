module SidebarHelper
  Link = Struct.new(:title, :path, :method)

  def sidenav_items
    links.map do |link|
      link_to link.path, class: "sidenav__link", method: link.method do
        content_tag :li, link.title, class: "sidenav__item"
      end
    end.join('').html_safe
  end

  private

  def links
    [
      Link.new("Intro Requests", intro_requests_path, :get),
      Link.new("Log Out", destroy_user_session_path, :delete),
    ]
  end
end
