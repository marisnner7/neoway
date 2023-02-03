require 'rails_helper'

RSpec.describe 'User', type: :request do
  let(:user) { create(:user) }  
  
  context 'with CPF' do
    let(:user) { create(:user, :with_cpf) }

    it 'creates a user with a valid CPF' do
      expect(user.cpf_valid?).to be true
    end
  end

  context 'with CNPJ' do
    let(:user) { create(:user, :with_cnpj) }

    it 'creates a user with a valid CNPJ' do
      expect(user.cnpj_valid?).to be true
    end
   end 
  
  describe 'GET /users' do
    before { get api_v1_users_path }    
    it 'returns status 200' do
      expect(response).to have_http_status(200)
    end
  end  
  
  describe 'GET /users/:id' do
    context 'when user exists' do
      let(:user) { create(:user, :with_cpf) }
      before { get api_v1_user_path(user.id) }      
        it 'returns status 200' do
          expect(response).to have_http_status(200)
        end      
        
        it 'CPF or CNPJ be_kind_of String' do
          response_body = JSON.parse(response.body)
          expect(response_body.fetch('cpf_cnpj')).to be_kind_of(String)
        end
    end    
    
    context 'when User does not exist' do
      let(:user) { create(:user, :with_cnpj) }
      it 'raises RecordNotFound when not found' do
        expect { get api_v1_user_path(0) }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end  
  
  describe 'POST /users' do
    let(:created_user) { User.last }
    
    context 'when CPF or CNPJ is VALID' do
      let(:json) { JSON.parse(response.body, symbolize_names: true) }      
      before { post api_v1_users_path, params: { user: { cpf_cnpj: '064.427.806-43' } } }
      
      it 'returns http status 201' do
        expect(response).to have_http_status(201)
      end      
    end

    context 'when CPF or CNPJ is INVALID' do
      it 'returns 422 with invalid number' do
        post api_v1_users_path, params: { user: { cpf_cnpj: '1XX21212121212' } }
        expect(response).to have_http_status(400)
      end      

      it 'returns 422 with invalid cpf or cnpj' do
        post api_v1_users_path, params: { user: { cpf_cnpj: 'INVALID' } }
        expect(response).to have_http_status(400)
      end      
      
      it 'do not create an user' do
        expect { created_user.cpf_cnpj }.to raise_error(NoMethodError)
      end
    end
  end  
    
  describe 'DELETE' do
    let(:user) { create(:user, :with_cpf) }
    context 'when user exists' do
      it 'returns 200' do
        delete api_v1_user_path(user.id)
        expect(response).to have_http_status(204)
       end
    end    
    context 'when user does not exist' do
      it 'raises RecordNotFound when not found' do
        expect { delete api_v1_user_path(User.find(0)) }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end