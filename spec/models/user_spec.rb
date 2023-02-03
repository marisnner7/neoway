require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { build(:user) }
  it { should validate_presence_of(:cpf_cnpj) }
  it { should validate_uniqueness_of(:cpf_cnpj) }
end