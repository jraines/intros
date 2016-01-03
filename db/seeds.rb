# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


page = HTTParty.get 'http://yclist.com'
doc  = Nokogiri::HTML(page)
rows = doc.css("#companies tr")

#omit header row
rows = rows[1..-1]

companies_data = rows.map do |row|
  {name: row.css("td")[1].inner_html.strip,
   yc_class: row.css("td")[3].inner_html.strip }
end

companies_data.each do |c|
  Company.create! name: c[:name]
end

non_yc_companies = (0..1000).map do
  Company.create name: Faker::Company.name
end

companies_data.each do |c|
  begin
    puts "getting founders for #{c[:name]}"
    slugged_name = c[:name].downcase.gsub(/\s+/, "-")

    2.times do
      first = Faker::Name.first_name
      last = Faker::Name.last_name

      user = User.create! first_name: first,
                          last_name: last,
                          email: "#{first}.#{last}@#{slugged_name}.com",
        password: '12121212',
        yc_class: c[:yc_class]

      company = Company.find_by_name c[:name]
      contact = company.contacts.create! name: "#{first} #{last}",
        title: "Founder"
      user.add_contact(contact)

      20.times do
        first = Faker::Name.first_name
        last = Faker::Name.last_name
        name = first + ' ' + last
        title = Faker::Name.title
        company = non_yc_companies.sample

        unless user.companies.include? company
          if company.contacts.present?
            if rand > 0.7
              user.add_contact(contact)
            else
              contact = company.contacts.create name: name, title: title
              user.add_contact(contact)
            end
          else
            contact = company.contacts.create name: name, title: title
            user.add_contact(contact)
          end
        end

      end
    end

  rescue => e
    puts e.message
    next
  end

end


######
    #
    # Was going to use real founders & company connections, but
    # got blocked from crunchbase.  With more time, would get a license,
    # but this requires an email to them to get a key and I didn't want
    # to wait before making this first version
######


    # page = HTTParty.get "https://www.crunchbase.com/organization/#{slugged_name}#/entity", opts
    # doc = Nokogiri::HTML(page)
    # founder_names = doc.css("#info-card-overview-content a.follow_card[data-type=person]").map &:inner_html

    # puts "No founders located" if founder_names.blank?

    # founder_names.each do |fn|
    #   name = fn.split(" ")[0]

    #   #rough hack to account for honorifics or 2 first names
    #   if name.length > 2
    #     first = name[0] + ' ' + name[1]
    #     last = name[2]
    #   else
    #     first = name[0]
    #     last = name[1]
    #   end
