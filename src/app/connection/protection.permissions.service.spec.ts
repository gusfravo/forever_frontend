import { TestBed } from '@angular/core/testing';

import { ProtectionPermissions } from './protection.permissions';

describe('Protection.PermissionsService', () => {
  let service: ProtectionPermissions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtectionPermissions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
