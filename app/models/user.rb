class User < ApplicationRecord
  validates :cpf_cnpj, presence: true, uniqueness: true
  validate :validate_cpf_cnpj
  

  def cpf?
    cpf_cnpj.length == 11
  end

  def cnpj?
    cpf_cnpj.length == 14
  end

  def validate_cpf_cnpj
    errors.add(:cpf_cnpj, 'Invalid CPF/CNPJ!') unless (cpf_valid? || cnpj_valid?)
  end

  def cpf_valid?
    CPF.valid?(cpf_cnpj)
  end

  def cnpj_valid?
    CNPJ.valid?(cpf_cnpj)
  end

end
