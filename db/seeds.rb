# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts 'Creating 10 Users'
10.times do
  User.create!(
    cpf_cnpj: Faker::IDNumber.brazilian_citizen_number
  )
end
puts 'Creating 10 Users… [OK]'

puts 'Creating 10 CNPJ'
10.times do
  User.create!(
    cpf_cnpj: Faker::Company.brazilian_company_number
  )
end
puts 'Creating 10 CNPJ… [OK]'