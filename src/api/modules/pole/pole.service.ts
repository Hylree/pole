import { Injectable, BadRequestException, HttpService, BadGatewayException, UnauthorizedException } from '@nestjs/common';
import { BaseService } from 'src/common/helper/base-service.service';
import { AuthApiTiers } from 'src/api/entities/auth-api/auth-api.entity';
import { request } from 'http';
import * as axios from 'axios';
import * as moment from 'moment';
import { CreatePoleDto } from './dto/create-pole.dto';
import { Commune } from 'src/api/entities/commune/commune.entity';

@Injectable()
export class PoleService extends BaseService<AuthApiTiers>{

    constructor(private httpService: HttpService) {
        super(AuthApiTiers)
    }

    async loginPole(authApiTiers : AuthApiTiers) : Promise<AuthApiTiers> {
        const resultHttp = await this.httpService.post('https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=/partenaire', new URLSearchParams({
            grant_type: authApiTiers.grantType,
            client_id: authApiTiers.clientId,
            client_secret: authApiTiers.clientSecret,
            scope: authApiTiers.scope,
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).toPromise();
            
        const resultLoginPole = resultHttp.data;
        if(!resultLoginPole.access_token){
            throw new UnauthorizedException({message: 'Echec de la connexion avec l\'api de pole emploi.'});
        }
        authApiTiers.accessToken = resultLoginPole.access_token;
        authApiTiers.expiresIn = resultLoginPole.expires_in;
        authApiTiers.dateToken = new Date();
        
        return await this.getRepository().save(authApiTiers);

    }

    async checkAccessTokenValid() {
        const authApiTiers: AuthApiTiers = await this.getRepository().findOne({ id: 1 });
        if(!!authApiTiers){
            if(authApiTiers.dateToken === null || moment().utc().isAfter(moment(authApiTiers.dateToken).utc().add(authApiTiers.expiresIn, 'seconds').add(-5, 'minutes')))
                return  this.loginPole(authApiTiers);
            else
                return authApiTiers;
        } else{
            throw new BadRequestException({message: 'Echec de la connexion avec l\'api de pole emploi.'});
        }
    } 

    async getEnterprise(createPoleDto: CreatePoleDto) {
        const authApiTiers: AuthApiTiers = await this.checkAccessTokenValid();

        const commune: Commune = await this.getConnection().getRepository(Commune).findOne({nom_commune : createPoleDto.ville ? createPoleDto.ville.toLocaleUpperCase() : null , code_postal : createPoleDto.codePostal});

        if(!!commune){
            const resultHttp = await this.httpService.get(`https://api.emploi-store.fr/partenaire/labonneboite/v1/company?commune_id=${commune.code_commune}&rome_codes=M1805`, {
                headers : {
                    'Authorization' : 'Bearer ' + authApiTiers.accessToken
            }}).toPromise();
                
            return resultHttp.data;

        } else throw new BadRequestException({message: 'La commune n\'a pas été trouvé.'});
        
        
    }

}