"""passion and opportunity relationship

Revision ID: 558109202e0c
Revises: 1b8ebca6acad
Create Date: 2018-10-21 16:02:13.183997

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '558109202e0c'
down_revision = '1b8ebca6acad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('passion',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_passion_id'), 'passion', ['id'], unique=False)
    op.create_table('passions',
    sa.Column('opportunity_id', sa.Integer(), nullable=True),
    sa.Column('passion_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['opportunity_id'], ['opportunity.id'], ),
    sa.ForeignKeyConstraint(['passion_id'], ['passion.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('passions')
    op.drop_index(op.f('ix_passion_id'), table_name='passion')
    op.drop_table('passion')
    # ### end Alembic commands ###
