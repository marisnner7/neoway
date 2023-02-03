FactoryBot.define do
  factory :user do
    trait :with_cpf do
      cpf_cnpj { Faker::IDNumber.brazilian_citizen_number }
    end

    trait :with_cnpj do
      cpf_cnpj { Faker::Company.brazilian_company_number }
    end
  end
end